import os
import re

directory = '/media/aruneshwaran/FDrive/SIC069/zero-gravity-tours/src'

# Files to skip (already manually rewritten)
skip_files = {
    'Navbar.tsx', 'Footer.tsx', 'MobileTabBar.tsx', 'TripCard.tsx',
    'GlowingButton.tsx', 'BentoGrid.tsx', 'globals.css', 'layout.tsx',
    'loading.tsx'
}

replacements = [
    # Fix broken bg-transparent on containers — make them truly transparent (no bg needed on dark canvas)
    ('bg-transparent', 'bg-transparent'),
    
    # Fix old pastel backgrounds that survived
    ('bg-[#FDE8EC]', 'bg-[rgba(12,22,38,0.85)]'),
    ('bg-[#FAF0DF]', 'bg-[rgba(12,22,38,0.85)]'),
    ('bg-[#EBF5EE]', 'bg-[rgba(12,22,38,0.85)]'),
    ('bg-[#F0EEFA]', 'bg-[rgba(12,22,38,0.85)]'),
    ('bg-[#E6F2F8]', 'bg-[rgba(12,22,38,0.85)]'),
    ('bg-[#FFFDF9]', 'bg-[rgba(8,17,28,0.95)]'),
    ('bg-[#FFF0F3]', 'bg-[rgba(12,22,38,0.85)]'),
    ('bg-[#FDF0E9]', 'bg-[rgba(12,22,38,0.85)]'),
    
    # Fix text colors
    ('text-[#780116]', 'text-[#C8A55C]'),
    ('text-[#7E5105]', 'text-[#C8A55C]'),
    ('text-[#D49018]', 'text-[#C8A55C]'),
    
    # Fix border colors  
    ('border-pink-200', 'border-[rgba(255,255,255,0.06)]'),
    ('border-pink-300/40', 'border-[rgba(255,255,255,0.06)]'),
    ('border-amber-200', 'border-[rgba(255,255,255,0.06)]'),
    ('border-emerald-200', 'border-[rgba(255,255,255,0.06)]'),
    ('border-indigo-200', 'border-[rgba(255,255,255,0.06)]'),
    ('border-[#780116]/10', 'border-[rgba(255,255,255,0.06)]'),
    ('border-[#780116]/20', 'border-[rgba(255,255,255,0.08)]'),
    ('border-[#F7B538]/40', 'border-[rgba(200,165,92,0.20)]'),
    ('border-[#F7B538]/25', 'border-[rgba(200,165,92,0.15)]'),
    ('border-[#F7B538]/50', 'border-[rgba(200,165,92,0.25)]'),
    
    # Fix old accent colors to new gold
    ('bg-[#780116]', 'bg-[#C8A55C]'),
    ('bg-[#9B0822]', 'bg-[#A8883A]'),
    ('text-[#F7B538]', 'text-[#05070B]'),
    ('hover:text-[#780116]', 'hover:text-[#C8A55C]'),
    ('hover:bg-[#9B0822]', 'hover:bg-[#A8883A]'),
    ('hover:bg-[#FAF0DF]', 'hover:bg-[rgba(200,165,92,0.06)]'),
    ('bg-[#F7B538]/10', 'bg-[rgba(200,165,92,0.08)]'),
    ('bg-[#F7B538]/20', 'bg-[rgba(200,165,92,0.10)]'),
    ('hover:bg-[#F7B538]/10', 'hover:bg-[rgba(200,165,92,0.06)]'),
    ('hover:bg-[#F7B538]/8', 'hover:bg-[rgba(200,165,92,0.06)]'),
    ('hover:bg-[#780116]/10', 'hover:bg-[rgba(200,165,92,0.06)]'),
    
    # Fix bg-white usages
    ('bg-white/10 backdrop-blur-md', 'bg-[rgba(12,22,38,0.85)] backdrop-blur-md'),
    
    # Fix old emerald text
    ('text-emerald-800', 'text-[#34D399]'),
    ('text-emerald-800/80', 'text-[#34D399]/80'),
    ('text-emerald-700', 'text-[#34D399]'),
    ('text-indigo-900', 'text-[#7DD3FC]'),
    ('text-indigo-900/80', 'text-[#7DD3FC]/80'),
    
    # Fix shadow colors
    ('shadow-[#780116]/30', 'shadow-[#C8A55C]/20'),
    ('shadow-[#F7B538]/30', 'shadow-[#C8A55C]/20'),
    
    # Fix old slate-100 text (was changed to text-slate-100)
    ('text-slate-100', 'text-[#94A3B8]'),
]

count = 0
for root, _, files in os.walk(directory):
    for file in files:
        if file in skip_files:
            continue
        if not (file.endswith('.tsx') or file.endswith('.ts')):
            continue
        path = os.path.join(root, file)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for old, new in replacements:
            new_content = new_content.replace(old, new)
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Fixed {path}")

print(f"\nTotal files updated: {count}")
