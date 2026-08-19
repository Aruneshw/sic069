import os

directory = '/media/aruneshwaran/FDrive/SIC069/zero-gravity-tours/src'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replaces
            new_content = content.replace('bg-[#FBF9F5]', 'bg-transparent')
            new_content = new_content.replace('bg-[#FAF7F2]', 'bg-transparent')
            new_content = new_content.replace('text-[#150408]', 'text-white')
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {path}")
