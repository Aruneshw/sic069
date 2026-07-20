import Link from "next/link";
import { ChevronRight, Calendar, MessageCircle, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/ui/StatusBadge";

export default async function MyEnquiriesPage() {
  // Fetch enquiries for the mock user "Alex Thompson"
  const enquiries = await prisma.enquiry.findMany({
    where: { userEmail: "alex.t@gmail.com" },
    include: { trip: true },
    orderBy: { requestedOn: "desc" },
  });

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900 mb-2">My Enquiries</h1>
        <p className="text-slate-500">Track the status of your trip requests and communications with our team.</p>
      </div>

      <div className="card-elevated bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Trip Name</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Requested On</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.length > 0 ? (
                enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={enquiry.trip.imageUrl || `https://source.unsplash.com/random/100x100/?${enquiry.trip.category.toLowerCase()}`}
                            alt={enquiry.trip.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-navy-900 mb-0.5 group-hover:text-teal-600 transition-colors">{enquiry.trip.name}</p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock size={12} /> {enquiry.trip.duration}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-700">
                        {enquiry.requestedOn.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <StatusBadge status={enquiry.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-navy-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors inline-flex">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    You have no active enquiries. <Link href="/trips" className="text-teal-600 font-medium hover:underline">Explore trips</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-slate-100">
          {enquiries.length > 0 ? (
            enquiries.map((enquiry) => (
              <div key={enquiry.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <StatusBadge status={enquiry.status} />
                  <span className="text-xs font-medium text-slate-500">
                    {enquiry.requestedOn.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={enquiry.trip.imageUrl || `https://source.unsplash.com/random/100x100/?${enquiry.trip.category.toLowerCase()}`}
                      alt={enquiry.trip.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1">{enquiry.trip.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12}/> {enquiry.trip.duration}</p>
                  </div>
                </div>
                
                <button className="w-full py-2 flex justify-center items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg active:bg-slate-100">
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500">
              You have no active enquiries.
            </div>
          )}
        </div>
      </div>
      
      {/* Enquiry Info Box */}
      <div className="mt-6 flex items-start gap-3 p-4 bg-teal-50 border border-teal-100 rounded-2xl">
        <MessageCircle size={20} className="text-teal-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-navy-900 mb-1">Need help with an enquiry?</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our travel experts typically respond within 24 hours. If your request is urgent, please call our support team directly at +61 2 8000 1234.
          </p>
        </div>
      </div>
    </div>
  );
}
