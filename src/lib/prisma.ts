import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "../generated/prisma/client";
import crypto from "crypto";

// Initialize the Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Utility to recursively parse stringified dates from Supabase back into Date objects
const parseDates = (obj: any): any => {
  if (!obj) return obj;
  if (Array.isArray(obj)) return obj.map(parseDates);
  
  const newObj = { ...obj };
  for (const key of Object.keys(newObj)) {
    if (typeof newObj[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(newObj[key])) {
      newObj[key] = new Date(newObj[key]);
    } else if (typeof newObj[key] === 'object' && newObj[key] !== null) {
      newObj[key] = parseDates(newObj[key]);
    }
  }
  return newObj;
};

// We expose a mock "prisma" object that perfectly intercepts Prisma queries 
// and executes native Supabase queries instead. This gives us the speed of Supabase
// without having to rewrite any frontend React code!
export const prisma = {
  trip: {
    findMany: async (args: any = {}) => {
      let query = supabase.from('Trip').select('*');
      if (args.where?.status) query = query.eq('status', args.where.status);
      if (args.orderBy) {
        const key = Object.keys(args.orderBy)[0];
        query = query.order(key, { ascending: args.orderBy[key] === 'asc' });
      }
      if (args.take) query = query.limit(args.take);
      if (args.select?.slug && Object.keys(args.select).length === 1) {
        query = supabase.from('Trip').select('slug');
      }
      const { data, error } = await query;
      if (error) console.error("Trip.findMany Error:", error);
      return parseDates(data || []);
    },
    findUnique: async (args: any) => {
      const { data, error } = await supabase.from('Trip').select('*').eq('slug', args.where.slug).single();
      if (error) console.error("Trip.findUnique Error:", error);
      return parseDates(data);
    }
  },
  enquiry: {
    findMany: async (args: any = {}) => {
      // simulate prisma include: { trip: true }
      let query = supabase.from('Enquiry').select('*, trip:Trip(*)');
      if (args.where?.userEmail) query = query.eq('userEmail', args.where.userEmail);
      if (args.orderBy) {
        const key = Object.keys(args.orderBy)[0];
        query = query.order(key, { ascending: args.orderBy[key] === 'asc' });
      }
      const { data, error } = await query;
      if (error) console.error("Enquiry.findMany Error:", error);
      
      // format response for Prisma (Supabase returns related data in nested objects, which matches Prisma)
      return parseDates(data || []);
    },
    create: async (args: any) => {
      const dataToInsert = { ...args.data };
      if (!dataToInsert.id) dataToInsert.id = crypto.randomUUID();
      const { data, error } = await supabase.from('Enquiry').insert(dataToInsert).select().single();
      if (error) console.error("Enquiry.create Error:", error);
      return parseDates(data);
    }
  },
  package: {
    findMany: async (args: any = {}) => {
      let query = supabase.from('Package').select('*');
      if (args.where?.status) query = query.eq('status', args.where.status);
      if (args.orderBy) {
        const key = Object.keys(args.orderBy)[0];
        query = query.order(key, { ascending: args.orderBy[key] === 'asc' });
      }
      const { data, error } = await query;
      if (error) console.error("Package.findMany Error:", error);
      return parseDates(data || []);
    }
  },
  departure: {
    findMany: async (args: any = {}) => {
      let query = supabase.from('Departure').select('*, trip:Trip(*)');
      if (args.orderBy) {
        const key = Object.keys(args.orderBy)[0];
        query = query.order(key, { ascending: args.orderBy[key] === 'asc' });
      }
      const { data, error } = await query;
      if (error) console.error("Departure.findMany Error:", error);
      return parseDates(data || []);
    }
  },
  contactMessage: {
    create: async (args: any) => {
      const dataToInsert = { ...args.data };
      if (!dataToInsert.id) dataToInsert.id = crypto.randomUUID();
      const { data, error } = await supabase.from('ContactMessage').insert(dataToInsert).select().single();
      if (error) {
        console.error("ContactMessage.create Error:", error);
        throw error;
      }
      return parseDates(data);
    }
  },
  loginHistory: {
    create: async (args: any) => {
      const dataToInsert = { ...args.data };
      if (!dataToInsert.id) dataToInsert.id = crypto.randomUUID();
      const { data, error } = await supabase.from('LoginHistory').insert(dataToInsert).select().single();
      if (error) {
        console.error("LoginHistory.create Error:", error);
        throw error;
      }
      return parseDates(data);
    }
  },
  user: {
    upsert: async (args: any) => {
      // Supabase upsert requires id to match
      const { data, error } = await supabase.from('User').upsert(args.create, { onConflict: 'id' }).select().single();
      if (error) {
        console.error("User.upsert Error:", error);
        throw error;
      }
      return parseDates(data);
    }
  }
} as unknown as PrismaClient;
