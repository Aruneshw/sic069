import os
import re

directory = '/media/aruneshwaran/FDrive/SIC069/zero-gravity-tours/src'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            
            # Replace bg-white on containers with glassmorphism
            # Specifically targeting bg-white when combined with rounded or shadow or p- (padding)
            new_content = re.sub(r'bg-white(\s+(rounded-|shadow-|p-))', r'bg-white/10 backdrop-blur-md\1', new_content)
            
            # Change text-slate-700, text-slate-600, text-slate-500 to text-slate-200 or white for better contrast
            new_content = new_content.replace('text-slate-700', 'text-slate-100')
            new_content = new_content.replace('text-slate-600', 'text-slate-200')
            new_content = new_content.replace('text-slate-500', 'text-slate-300')
            new_content = new_content.replace('text-[#150408]', 'text-white')
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {path}")
