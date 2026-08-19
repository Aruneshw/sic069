import re

with open('/media/aruneshwaran/FDrive/SIC069/zero-gravity-tours/src/app/globals.css', 'r') as f:
    css = f.read()

# Replace body background
css = re.sub(
    r'body\s*\{[^}]*\}',
    '''body {
  background-image: url('/images/bg-mountain.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
  background-attachment: fixed !important;
  background-color: #0f172a !important;
  color: #F8FAFC !important;
  font-family: var(--font-sans);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}''',
    css,
    flags=re.MULTILINE
)

# Add backdrop filter to bento-card-base
css = re.sub(
    r'(\.bento-card-base\s*\{[^}]*)(justify-content:\s*space-between;)(\s*\})',
    r'\1\2\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n\3',
    css,
    flags=re.MULTILINE
)

# Global canvas colors
css = css.replace('--bg-primary: #FBF9F5;', '--bg-primary: transparent;')
css = css.replace('--text-primary: #150408;', '--text-primary: #FFFFFF;')
css = css.replace('--text-secondary: #475569;', '--text-secondary: #E2E8F0;')

# Now the hard part, replacing the bento colors block entirely
start_idx = css.find('/* ── Givingli Color Variations ── */')
end_idx = css.find('/* ── Claymorphism Floating Elements ── */')

if start_idx != -1 and end_idx != -1:
    new_bento_block = '''/* ── Givingli Color Variations ── */
.bento-lavender {
  background-color: rgba(147, 130, 220, 0.15);
  border: 1px solid rgba(147, 130, 220, 0.3);
  color: #FFFFFF;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
}
.bento-lavender:hover {
  background-color: rgba(147, 130, 220, 0.25);
  border-color: rgba(147, 130, 220, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
}

.bento-blush {
  background-color: rgba(246, 148, 168, 0.15);
  border: 1px solid rgba(246, 148, 168, 0.3);
  color: #FFFFFF;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
}
.bento-blush:hover {
  background-color: rgba(246, 148, 168, 0.25);
  border-color: rgba(246, 148, 168, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
}

.bento-sage {
  background-color: rgba(134, 194, 156, 0.15);
  border: 1px solid rgba(134, 194, 156, 0.3);
  color: #FFFFFF;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
}
.bento-sage:hover {
  background-color: rgba(134, 194, 156, 0.25);
  border-color: rgba(134, 194, 156, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
}

.bento-champagne {
  background-color: rgba(247, 181, 56, 0.1);
  border: 1px solid rgba(247, 181, 56, 0.25);
  color: #FFFFFF;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
}
.bento-champagne:hover {
  background-color: rgba(247, 181, 56, 0.15);
  border-color: rgba(247, 181, 56, 0.4);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
}

.bento-gold {
  background: linear-gradient(145deg, rgba(249, 200, 98, 0.15) 0%, rgba(212, 144, 24, 0.15) 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
}
.bento-gold:hover {
  background: linear-gradient(145deg, rgba(249, 200, 98, 0.25) 0%, rgba(212, 144, 24, 0.25) 100%);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
}

.bento-crimson {
  background: linear-gradient(145deg, rgba(139, 2, 26, 0.25) 0%, rgba(74, 0, 14, 0.25) 100%);
  border: 1px solid rgba(247, 181, 56, 0.25);
  color: #FFFFFF;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
}
.bento-crimson:hover {
  background: linear-gradient(145deg, rgba(139, 2, 26, 0.35) 0%, rgba(74, 0, 14, 0.35) 100%);
  border-color: rgba(247, 181, 56, 0.4);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
}

.bento-white {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
}
.bento-white:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
}

.bento-sky {
  background-color: rgba(147, 197, 253, 0.15);
  border: 1px solid rgba(147, 197, 253, 0.3);
  color: #FFFFFF;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
}
.bento-sky:hover {
  background-color: rgba(147, 197, 253, 0.25);
  border-color: rgba(147, 197, 253, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
}

'''
    css = css[:start_idx] + new_bento_block + css[end_idx:]

with open('/media/aruneshwaran/FDrive/SIC069/zero-gravity-tours/src/app/globals.css', 'w') as f:
    f.write(css)

