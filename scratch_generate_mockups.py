import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('D:/mmrtechsolutions/public', exist_ok=True)

# Helper function to get default or truetype font
def get_font(size, bold=False):
    font_paths = [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibri.ttf"
    ]
    if bold:
        font_paths = [
            "C:/Windows/Fonts/segoeuib.ttf",
            "C:/Windows/Fonts/arialbd.ttf",
            "C:/Windows/Fonts/calibrib.ttf"
        ] + font_paths

    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

def draw_sidebar(draw, w, h):
    # Sidebar bg
    draw.rectangle([(0, 0), (220, h)], fill="#0f2444")
    
    # Logo
    draw.text((20, 18), "🏢 EasyPharma Whol...", fill="#ffffff", font=get_font(15, bold=True))
    draw.text((20, 36), "Wholesale Management", fill="#94a3b8", font=get_font(10))
    
    # Nav items
    items = [
        ("📊 Dashboard", True),
        ("📁 Masters", False),
        ("🛒 Purchase", False),
        ("💳 Sales / Billing", False),
        ("📦 Inventory", False),
        ("📑 Accounts", False),
        ("🛡️ Compliance", False),
        ("📈 Reports", False),
        ("⚙️ Settings", False),
    ]
    y = 70
    for title, active in items:
        if active:
            draw.rounded_rectangle([(12, y), (208, y + 34)], radius=8, fill="#0284c7")
            draw.text((24, y + 8), title, fill="#ffffff", font=get_font(12, bold=True))
        else:
            draw.text((24, y + 8), title, fill="#cbd5e1", font=get_font(12))
        y += 42
        
    draw.text((24, h - 35), "🚪 Logout", fill="#ef4444", font=get_font(12, bold=True))

def draw_header(draw, title, w):
    draw.rectangle([(220, 0), (w, 55)], fill="#ffffff")
    draw.line([(220, 55), (w, 55)], fill="#e2e8f0", width=1)
    
    draw.text((240, 18), title, fill="#0f172a", font=get_font(16, bold=True))
    
    # User pill
    draw.rounded_rectangle([(w - 240, 12), (w - 30, 42)], radius=15, fill="#f1f5f9", outline="#cbd5e1", width=1)
    draw.text((w - 225, 18), "🏢 EasyPharma Default • adminuser", fill="#334155", font=get_font(11, bold=True))

# ── 1. GENERATE WHOLESALE DASHBOARD ──
def generate_dashboard():
    w, h = 1200, 680
    img = Image.new('RGB', (w, h), color='#f8fafc')
    draw = ImageDraw.Draw(img)
    
    draw_sidebar(draw, w, h)
    draw_header(draw, "📊 Dashboard Overview", w)
    
    # 4 Metric Cards
    metrics = [
        ("TOTAL REVENUE", "₹4,82,500", "+₹38,400 booked today", "#10b981", "#ecfdf5", "₹"),
        ("OUTSTANDING DUES", "₹1,24,600", "12 retailers pending dues", "#ef4444", "#fef2f2", "⏱"),
        ("ACTIVE RETAILERS", "148 Chemist Stores", "24 bills created today", "#6366f1", "#eef2ff", "👥"),
        ("MEDICINE CATALOG", "3,420 Active SKUs", "Stock healthy (Zero Dead)", "#0284c7", "#f0f9ff", "💊")
    ]
    
    x = 240
    card_w = 220
    for title, val, sub, color, bg, icon in metrics:
        draw.rounded_rectangle([(x, 70), (x + card_w, 175)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
        draw.rounded_rectangle([(x + card_w - 42, 82), (x + card_w - 12, 112)], radius=8, fill=bg)
        draw.text((x + card_w - 32, 88), icon, fill=color, font=get_font(14, bold=True))
        
        draw.text((x + 14, 82), title, fill="#64748b", font=get_font(10, bold=True))
        draw.text((x + 14, 102), val, fill="#0f172a", font=get_font(18, bold=True))
        draw.text((x + 14, 142), sub, fill=color, font=get_font(10, bold=True))
        x += card_w + 18
        
    # AI Smart Forecasts Box
    draw.rounded_rectangle([(240, 190), (w - 30, 310)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((255, 202), "✨ AI Smart Business Forecasts", fill="#0f172a", font=get_font(13, bold=True))
    draw.rounded_rectangle([(470, 200), (590, 222)], radius=10, fill="#ede9fe")
    draw.text((478, 204), "Local Predictive Engine", fill="#6d28d9", font=get_font(9, bold=True))
    
    # 3 Forecast Pillars
    f_items = [
        ("Projected Sales (Next Month)", "₹14,50,000", "High demand expected in Antibiotics & Analgesics."),
        ("Est. Cash Collection from Dues", "₹1,18,000", "Likely to recover from 12 active credit retailers."),
        ("Est. Purchase Requirements", "₹3,80,000", "Stocking budget needed to avoid fast-moving stockouts.")
    ]
    fx = 255
    for f_title, f_val, f_desc in f_items:
        draw.rounded_rectangle([(fx, 230), (fx + 285, 295)], radius=8, fill="#f8fafc", outline="#f1f5f9", width=1)
        draw.text((fx + 10, 236), f_title, fill="#475569", font=get_font(10))
        draw.text((fx + 10, 252), f_val, fill="#0284c7", font=get_font(15, bold=True))
        draw.text((fx + 10, 274), f_desc, fill="#64748b", font=get_font(8))
        fx += 300

    # Today's Snapshot Bar
    draw.rounded_rectangle([(240, 325), (w - 30, 395)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((255, 335), "📅 Today's Snapshot", fill="#0f172a", font=get_font(12, bold=True))
    
    snaps = [
        ("Today's Sales", "₹42,850"),
        ("Today's Bills", "28 Invoices"),
        ("Avg. Bill Value", "₹1,530"),
        ("Out of Stock Items", "0 SKUs (100% Filled)")
    ]
    sx = 255
    for slabel, sval in snaps:
        draw.text((sx, 355), slabel, fill="#64748b", font=get_font(10))
        draw.text((sx, 370), sval, fill="#0f172a", font=get_font(13, bold=True))
        sx += 225

    # Bottom Charts & Widgets
    # Left: Weekly Revenue Trend (Bar Chart simulation)
    draw.rounded_rectangle([(240, 410), (660, 655)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((255, 422), "📈 Weekly Revenue Trend (Mon - Sat)", fill="#0f172a", font=get_font(12, bold=True))
    
    days = [("Mon", 65, "₹38k"), ("Tue", 85, "₹48k"), ("Wed", 55, "₹32k"), ("Thu", 95, "₹56k"), ("Fri", 120, "₹72k"), ("Sat", 110, "₹65k")]
    bx = 275
    for day, bar_h, rev in days:
        draw.rounded_rectangle([(bx, 600 - bar_h), (bx + 40, 600)], radius=6, fill="#0284c7")
        draw.text((bx + 5, 580 - bar_h), rev, fill="#0284c7", font=get_font(9, bold=True))
        draw.text((bx + 8, 610), day, fill="#64748b", font=get_font(10))
        bx += 62
        
    # Right: Expiry Alerts & Order Split
    draw.rounded_rectangle([(675, 410), (w - 30, 655)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((690, 422), "🚨 Near Expiry Batch Alerts (Next 45 Days)", fill="#0f172a", font=get_font(12, bold=True))
    
    exp_batches = [
        ("Augmentin 625 Duo", "Batch AG2489", "Exp: Nov 2026", "110 Qty Left", "#ef4444"),
        ("Azithral 500mg Tab", "Batch AZ7731", "Exp: Dec 2026", "45 Qty Left", "#f59e0b"),
        ("Pan-D 40mg Capsule", "Batch PD9912", "Exp: Jan 2027", "80 Qty Left", "#f59e0b"),
    ]
    ey = 450
    for med, bno, exp, qty, tagcol in exp_batches:
        draw.rounded_rectangle([(690, ey), (w - 45, ey + 48)], radius=8, fill="#f8fafc", outline="#e2e8f0", width=1)
        draw.text((700, ey + 8), med, fill="#0f172a", font=get_font(11, bold=True))
        draw.text((700, ey + 26), f"{bno} • {exp}", fill="#64748b", font=get_font(10))
        draw.rounded_rectangle([(w - 155, ey + 12), (w - 60, ey + 36)], radius=6, fill="#fef2f2" if tagcol == "#ef4444" else "#fffbeb")
        draw.text((w - 145, ey + 16), qty, fill=tagcol, font=get_font(10, bold=True))
        ey += 56

    img.save('D:/mmrtechsolutions/public/wholesale_dashboard.png', 'PNG')
    print("Wholesale Dashboard Generated!")

# ── 2. GENERATE WHOLESALE PURCHASE ENTRY (AI PHOTO SCAN) ──
def generate_purchase():
    w, h = 1200, 680
    img = Image.new('RGB', (w, h), color='#f8fafc')
    draw = ImageDraw.Draw(img)
    
    draw_sidebar(draw, w, h)
    draw_header(draw, "🛒 Add Purchase Entry (Supplier Bill)", w)
    
    # Action buttons
    draw.rounded_rectangle([(240, 68), (440, 100)], radius=8, fill="#059669")
    draw.text((255, 76), "📸 Scan Purchase Bill (AI Photo)", fill="#ffffff", font=get_font(11, bold=True))
    
    # 1. Invoice Details Box
    draw.rounded_rectangle([(240, 110), (840, 195)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((255, 120), "1. INVOICE DETAILS", fill="#0f172a", font=get_font(11, bold=True))
    
    # Fields
    draw.text((255, 140), "SUPPLIER *", fill="#64748b", font=get_font(9, bold=True))
    draw.rounded_rectangle([(255, 155), (460, 185)], radius=6, fill="#f8fafc", outline="#cbd5e1", width=1)
    draw.text((265, 162), "Abbott Healthcare Pvt Ltd", fill="#0f172a", font=get_font(10, bold=True))
    
    draw.text((480, 140), "INVOICE NO *", fill="#64748b", font=get_font(9, bold=True))
    draw.rounded_rectangle([(480, 155), (630, 185)], radius=6, fill="#f8fafc", outline="#cbd5e1", width=1)
    draw.text((490, 162), "AB-884912", fill="#0f172a", font=get_font(10, bold=True))
    
    draw.text((650, 140), "DATE *", fill="#64748b", font=get_font(9, bold=True))
    draw.rounded_rectangle([(650, 155), (820, 185)], radius=6, fill="#f8fafc", outline="#cbd5e1", width=1)
    draw.text((660, 162), "23-09-2026", fill="#0f172a", font=get_font(10))

    # Right: Order Summary Box
    draw.rounded_rectangle([(860, 110), (w - 30, 560)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((880, 125), "📦 Order Summary", fill="#0f172a", font=get_font(13, bold=True))
    
    summary_lines = [
        ("Sub Total", "₹30,775.00"),
        ("CGST (6%)", "₹1,846.50"),
        ("SGST (6%)", "₹1,846.50"),
        ("Total GST", "+₹3,693.00"),
        ("Discount", "-₹240.00"),
        ("Payment Mode", "CREDIT (A/P)"),
    ]
    sy = 160
    for slabel, sval in summary_lines:
        draw.text((880, sy), slabel, fill="#64748b", font=get_font(11))
        draw.text((w - 140, sy), sval, fill="#0f172a", font=get_font(11, bold=True))
        sy += 30
        
    draw.line([(880, sy), (w - 50, sy)], fill="#e2e8f0", width=1)
    sy += 15
    draw.text((880, sy), "GRAND TOTAL", fill="#64748b", font=get_font(11, bold=True))
    draw.text((880, sy + 20), "₹34,228.00", fill="#059669", font=get_font(24, bold=True))
    
    # Save button
    draw.rounded_rectangle([(880, 480), (w - 50, 535)], radius=10, fill="#059669")
    draw.text((930, 498), "✓ Save Purchase Entry", fill="#ffffff", font=get_font(12, bold=True))

    # Items Added Table (Auto-Extracted from Photo)
    draw.rounded_rectangle([(240, 210), (840, 650)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((255, 222), "3. ITEMS ADDED (4 Items Extracted via Photo Scan)", fill="#0f172a", font=get_font(11, bold=True))
    
    # Table Header
    headers = [("PRODUCT", 255), ("BATCH", 420), ("EXPIRY", 490), ("QTY+FREE", 555), ("P.RATE", 630), ("GST", 695), ("AMOUNT", 750)]
    draw.rectangle([(245, 245), (835, 270)], fill="#f1f5f9")
    for hname, hx in headers:
        draw.text((hx, 250), hname, fill="#475569", font=get_font(9, bold=True))
        
    table_rows = [
        ("Augmentin 625 Duo Tab", "AG2489", "11/27", "100 + 10F", "₹142.50", "12%", "₹13,965.00"),
        ("Pan-D 40mg Capsule", "PD9912", "08/26", "50 + 5F", "₹118.20", "12%", "₹5,910.00"),
        ("Telma 40mg Tablet", "TM4401", "03/27", "80 + 8F", "₹92.00", "12%", "₹7,360.00"),
        ("Azithral 500mg Tablet", "AZ7731", "05/26", "40 + 4F", "₹88.50", "12%", "₹3,540.00"),
    ]
    ry = 280
    for prod, batch, exp, qty, prate, gst, amt in table_rows:
        draw.line([(245, ry + 28), (835, ry + 28)], fill="#f1f5f9", width=1)
        draw.text((255, ry + 6), prod, fill="#0f172a", font=get_font(10, bold=True))
        draw.text((420, ry + 6), batch, fill="#6366f1", font=get_font(10))
        draw.text((490, ry + 6), exp, fill="#f59e0b", font=get_font(10))
        draw.text((555, ry + 6), qty, fill="#059669", font=get_font(10, bold=True))
        draw.text((630, ry + 6), prate, fill="#0f172a", font=get_font(10))
        draw.text((695, ry + 6), gst, fill="#0284c7", font=get_font(10))
        draw.text((750, ry + 6), amt, fill="#0f172a", font=get_font(10, bold=True))
        ry += 38

    img.save('D:/mmrtechsolutions/public/wholesale_purchase.png', 'PNG')
    print("Wholesale Purchase Generated!")

# ── 3. GENERATE WHOLESALE SALES INVOICE (BILLING) ──
def generate_sales():
    w, h = 1200, 680
    img = Image.new('RGB', (w, h), color='#f8fafc')
    draw = ImageDraw.Draw(img)
    
    draw_sidebar(draw, w, h)
    draw_header(draw, "💳 Create Sales Invoice (Wholesale Bill to Chemist)", w)
    
    # Customer Bar
    draw.rounded_rectangle([(240, 70), (w - 30, 150)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
    draw.text((255, 82), "CUSTOMER (CHEMIST / MEDICAL STORE) *", fill="#64748b", font=get_font(9, bold=True))
    draw.rounded_rectangle([(255, 98), (560, 132)], radius=6, fill="#f8fafc", outline="#cbd5e1", width=1)
    draw.text((265, 106), "Prince Medical Store, Pusad (Adil Khan)", fill="#0f172a", font=get_font(11, bold=True))
    
    draw.text((580, 82), "INVOICE DATE *", fill="#64748b", font=get_font(9, bold=True))
    draw.rounded_rectangle([(580, 98), (730, 132)], radius=6, fill="#f8fafc", outline="#cbd5e1", width=1)
    draw.text((590, 106), "23-09-2026", fill="#0f172a", font=get_font(10))
    
    draw.text((750, 82), "PAYMENT TYPE *", fill="#64748b", font=get_font(9, bold=True))
    draw.rounded_rectangle([(750, 98), (920, 132)], radius=6, fill="#f8fafc", outline="#cbd5e1", width=1)
    draw.text((760, 106), "Credit (7 Days Terms)", fill="#6366f1", font=get_font(10, bold=True))
    
    draw.text((940, 82), "OPERATOR", fill="#64748b", font=get_font(9, bold=True))
    draw.rounded_rectangle([(940, 98), (w - 45, 132)], radius=6, fill="#f8fafc", outline="#cbd5e1", width=1)
    draw.text((950, 106), "ADMINUSER (ONLINE)", fill="#059669", font=get_font(10, bold=True))

    # Fast Product Search Bar
    draw.rounded_rectangle([(240, 160), (w - 30, 220)], radius=12, fill="#f0fdf4", outline="#bbf7d0", width=1)
    draw.text((255, 172), "🔍 FAST PRODUCT ENTRY (F2 Shortcut)", fill="#166534", font=get_font(10, bold=True))
    draw.rounded_rectangle([(255, 188), (650, 212)], radius=6, fill="#ffffff", outline="#86efac", width=1)
    draw.text((265, 192), "Dolo 650mg Tablet (Micro Labs) - In Stock: 450 Strips", fill="#166534", font=get_font(10, bold=True))
    draw.rounded_rectangle([(670, 188), (770, 212)], radius=6, fill="#16a34a")
    draw.text((685, 194), "+ Add (Enter)", fill="#ffffff", font=get_font(10, bold=True))

    # Invoice Items Table
    draw.rounded_rectangle([(240, 235), (w - 30, 520)], radius=12, fill="#ffffff", outline="#e2e8f0", width=1)
    
    headers = [("PRODUCT NAME", 255), ("BATCH NO", 450), ("EXPIRY", 540), ("MRP", 620), ("RATE", 685), ("QTY+FREE", 750), ("GST", 830), ("TOTAL AMT", 900)]
    draw.rectangle([(245, 245), (w - 35, 270)], fill="#f1f5f9")
    for hname, hx in headers:
        draw.text((hx, 250), hname, fill="#475569", font=get_font(9, bold=True))
        
    sales_rows = [
        ("Dolo 650mg Tablet", "DL992", "09/27", "₹34.00", "₹24.50", "200 + 20 Free", "12%", "₹4,900.00"),
        ("Clavam 625 Tablet", "CL118", "01/28", "₹223.00", "₹158.00", "50 + 5 Free", "12%", "₹7,900.00"),
        ("Montair-LC Tablet", "MT443", "12/26", "₹185.00", "₹132.00", "40 + 4 Free", "12%", "₹5,280.00"),
        ("Cetirizine 10mg Tab", "CT204", "04/27", "₹22.00", "₹14.00", "100 + 10 Free", "12%", "₹1,400.00"),
    ]
    ry = 280
    for prod, batch, exp, mrp, rate, qty, gst, amt in sales_rows:
        draw.line([(245, ry + 28), (w - 35, ry + 28)], fill="#f1f5f9", width=1)
        draw.text((255, ry + 6), prod, fill="#0f172a", font=get_font(10, bold=True))
        draw.text((450, ry + 6), batch, fill="#6366f1", font=get_font(10))
        draw.text((540, ry + 6), exp, fill="#f59e0b", font=get_font(10))
        draw.text((620, ry + 6), mrp, fill="#64748b", font=get_font(10))
        draw.text((685, ry + 6), rate, fill="#0f172a", font=get_font(10))
        draw.text((750, ry + 6), qty, fill="#059669", font=get_font(10, bold=True))
        draw.text((830, ry + 6), gst, fill="#0284c7", font=get_font(10))
        draw.text((900, ry + 6), amt, fill="#0f172a", font=get_font(10, bold=True))
        ry += 38

    # Bottom Summary Bar
    draw.rounded_rectangle([(240, 535), (w - 30, 660)], radius=12, fill="#0f172a")
    draw.text((260, 555), "Gross Taxable: ₹19,480.00", fill="#cbd5e1", font=get_font(11))
    draw.text((260, 580), "Scheme Free Value: ₹1,948.00 (10+1 Applied)", fill="#34d399", font=get_font(11, bold=True))
    draw.text((260, 605), "Total GST Tax: +₹2,337.60", fill="#93c5fd", font=get_font(11))
    
    draw.text((600, 555), "Credit Balance: ₹12,400 (Within ₹50k Limit)", fill="#cbd5e1", font=get_font(11))
    draw.text((600, 580), "Route Dispatch: Pusad North Sector", fill="#cbd5e1", font=get_font(11))
    
    draw.text((w - 280, 555), "GRAND NET RECEIVABLE", fill="#94a3b8", font=get_font(10, bold=True))
    draw.text((w - 280, 575), "₹21,817.00", fill="#34d399", font=get_font(24, bold=True))
    
    draw.rounded_rectangle([(w - 280, 615), (w - 60, 650)], radius=8, fill="#10b981")
    draw.text((w - 245, 624), "Print & Dispatch Bill", fill="#0f172a", font=get_font(11, bold=True))

    img.save('D:/mmrtechsolutions/public/wholesale_sales.png', 'PNG')
    print("Wholesale Sales Generated!")

generate_dashboard()
generate_purchase()
generate_sales()
