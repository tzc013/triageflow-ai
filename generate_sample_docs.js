import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const SAMPLE_DIR = path.resolve(process.cwd(), 'sample-documents');
if (!fs.existsSync(SAMPLE_DIR)) {
  fs.mkdirSync(SAMPLE_DIR, { recursive: true });
}

const docsData = [
  {
    filename: 'Company_Overview.pdf',
    title: 'NORTHSTAR ESTATES — COMPANY OVERVIEW & PROFILE',
    pages: [
      [
        'NORTHSTAR ESTATES',
        'Executive Company Overview & Corporate Profile',
        'Headquarters: Executive Tower, Jinnah Avenue, Blue Area, Islamabad, Pakistan',
        'Regional Office: Civic Center, Phase 4, Bahria Town, Rawalpindi, Pakistan',
        'Established: 2018 | Reg: SECP-RE-882910 | NTN: 7392019-4',
        '',
        '1. ABOUT NORTHSTAR ESTATES',
        'Northstar Estates is a premier luxury real-estate advisory, asset management, and brokerage firm operating primarily within Islamabad and Rawalpindi. Founded in 2018, Northstar Estates has facilitated over PKR 18 Billion in prime residential and commercial transactions.',
        '',
        '2. CORE MISSION & VALUE PROPOSITION',
        'Our mission is to provide high-net-worth individuals, overseas Pakistani families, and corporate institutions with institutional-grade property acquisition advisory, verified title auditing, and transparent brokerage execution. "Integrity, Verification, and Precision" remain the pillars of every transaction.',
        '',
        '3. OPERATIONAL REACH & SPECIALIZATIONS',
        'Northstar Estates specializes exclusively in tier-one properties across Islamabad and Rawalpindi. Our portfolio spans luxury apartments, modern penthouses, executive canal villas, and Grade-A commercial office suites.',
        'Our licensed advisory staff comprises 45 real estate consultants, certified legal conveyancers, and property valuation specialists.'
      ],
      [
        'NORTHSTAR ESTATES — OPERATIONS & GOVERNANCE',
        '',
        '4. CORPORATE GOVERNANCE',
        'Northstar Estates is governed by an executive management committee overseeing strategic acquisitions, risk mitigation, and compliance with the Capital Development Authority (CDA) and Rawalpindi Development Authority (RDA) regulatory frameworks.',
        'The firm operates with strict anti-money laundering (AML) controls and adheres to international real-estate transparency standards.',
        '',
        '5. CLIENT SATISFACTION & REPUTATION',
        '- Client retention and satisfaction index: 98.4% across 2019–2024 operations.',
        '- Over 65% of annual transaction volume originates from recurring private family offices and overseas diaspora investors in the UAE, UK, and North America.',
        '- Total properties closed in previous fiscal cycles: Over 320 residential units.',
        '',
        '6. NOTE ON HISTORICAL DISCLOSURES',
        'All corporate balance sheets, audit statements, and fiscal records published to date reflect validated audited filings through year-end 2024. Future projections or hypothetical 2025 revenue milestones are not disclosed in general corporate documentation to preserve client privacy and regulatory adherence.'
      ]
    ]
  },
  {
    filename: 'Property_Listings.pdf',
    title: 'NORTHSTAR ESTATES — EXCLUSIVE PROPERTY LISTINGS PORTFOLIO',
    pages: [
      [
        'NORTHSTAR ESTATES',
        'Exclusive Residential Property Listings Portfolio — Official Catalog',
        'Twin Cities Luxury Collection: Islamabad & Rawalpindi',
        '',
        'PROPERTY 1: MAPLE RESIDENCY',
        '- Location: Sector F-11, Islamabad',
        '- Property Type: Luxury Mid-Rise Executive Apartment',
        '- Bedrooms: 3 bedrooms (with attached designer bathrooms)',
        '- Price: PKR 42,000,000 (Forty-Two Million Pakistani Rupees)',
        '- Covered Area: 2,450 square feet',
        '- Features: Italian imported kitchen fittings, separate maid/servant quarters, 2 reserved basement parking slots, 24/7 dedicated generator backup, high-speed Otis elevators.',
        '- Possession Status: Ready for Immediate Possession. Clean title with direct CDA allotment verification.',
        '',
        'PROPERTY 2: CEDAR HEIGHTS',
        '- Location: Sector E-11, Islamabad',
        '- Property Type: Contemporary Scenic Penthouse & Residence',
        '- Bedrooms: 4 bedrooms (all en-suite with walk-in wardrobes)',
        '- Price: PKR 46,500,000 (Forty-Six Million Five Hundred Thousand Pakistani Rupees)',
        '- Covered Area: 3,100 square feet',
        '- Features: Double-height living room ceilings, panoramic unobstructed Margalla Hills views, 600 sq ft private wrap-around terrace, smart home climate automation, 3 car parking bays.',
        '- Possession Status: Ready for Possession.'
      ],
      [
        'NORTHSTAR ESTATES — PROPERTY LISTINGS (CONTINUED)',
        '',
        'PROPERTY 3: LAKEVIEW APARTMENTS',
        '- Location: Club Road / Rawal Lake Enclave, Islamabad',
        '- Property Type: High-End Waterfront Designer Apartment',
        '- Bedrooms: 2 bedrooms (master suite + guest suite with lake view)',
        '- Price: PKR 49,500,000 (Forty-Nine Million Five Hundred Thousand Pakistani Rupees)',
        '- Covered Area: 1,850 square feet',
        '- Features: Uninterrupted views of Rawal Lake, soundproof double-glazed acoustic glass, concierge reception, rooftop infinity pool and wellness gym access, 2 reserved parking bays.',
        '- Possession Status: Ready for Immediate Handover.',
        '',
        'PROPERTY 4: PINE VILLAS',
        '- Location: Phase 8, Bahria Town, Rawalpindi',
        '- Property Type: Executive Gated Villa / Independent Luxury Mansion',
        '- Bedrooms: 5 bedrooms (all en-suite with Spanish porcelain tiles)',
        '- Price: PKR 62,000,000 (Sixty-Two Million Pakistani Rupees)',
        '- Covered Area: 4,800 square feet (Full 1 Kanal Plot)',
        '- Features: Landscaped front & back lawn, 2 separate servant quarters, 4-car covered porch, 15kW hybrid solar power setup with net-metering, private study room, Turkish steam shower.',
        '- Possession Status: Ready for Possession. Clear Bahria Town registry and transfer documentation.'
      ],
      [
        'NORTHSTAR ESTATES — LISTINGS COMPARISON & PORTFOLIO SUMMARY',
        '',
        'SUMMARY COMPARISON OF NORTHSTAR EXCLUSIVE PROPERTIES:',
        '1. Maple Residency: Islamabad | 3 bedrooms | PKR 42,000,000 (Lowest price point)',
        '2. Cedar Heights: Islamabad | 4 bedrooms | PKR 46,500,000',
        '3. Lakeview Apartments: Islamabad | 2 bedrooms | PKR 49,500,000',
        '4. Pine Villas: Rawalpindi | 5 bedrooms | PKR 62,000,000 (Most expensive property in portfolio)',
        '',
        'ISLAMABAD PROPERTIES PRICED BELOW PKR 50 MILLION:',
        'Clients searching for Islamabad properties under the PKR 50,000,000 threshold can consider three distinctive options:',
        'a) Maple Residency (Sector F-11) — PKR 42,000,000 (3 Bedrooms)',
        'b) Cedar Heights (Sector E-11) — PKR 46,500,000 (4 Bedrooms)',
        'c) Lakeview Apartments (Club Road) — PKR 49,500,000 (2 Bedrooms)',
        '',
        'The only property located in Rawalpindi is Pine Villas (PKR 62,000,000), which exceeds PKR 50M and represents the largest covered area (4,800 sq ft, 5 bedrooms).'
      ]
    ]
  },
  {
    filename: 'Services_and_Fees.pdf',
    title: 'NORTHSTAR ESTATES — SERVICES AND COMMISSION SCHEDULE',
    pages: [
      [
        'NORTHSTAR ESTATES',
        'Professional Advisory Services, Brokerage Mandates & Fee Schedule',
        '',
        '1. SCOPE OF SERVICES',
        'Northstar Estates provides end-to-end real estate brokerage and property advisory solutions:',
        '- Buyer Representation: Bespoke property sourcing, confidential negotiation, and verification of seller ownership rights.',
        '- Seller Representation: Exclusive listing syndication, high-definition digital marketing, and vetted qualified buyer procurement.',
        '- Title Conveyance & Legal Due Diligence: Comprehensive title search at CDA, RDA, and land revenue authorities.',
        '- Property Valuation & Assessment: Comparative market analysis (CMA) and rental yield projections for investors.',
        '- Overseas Client Relocation & Concierge: Complete remote closing services via Power of Attorney (PoA) facilitation.',
        '',
        '2. SALES COMMISSION POLICY & STRUCTURE',
        'Northstar Estates maintains a strictly transparent and uniform fee structure across all residential and commercial sales:',
        '- Standard Sales Commission: 2% of the final agreed transaction value.',
        '- Commission is due and payable in full upon execution of the formal transfer or registration of the Sale Deed.',
        '- There are no hidden brokerage markups, undisclosed spreads, or unauthorized side fees.'
      ],
      [
        'NORTHSTAR ESTATES — COMMISSION CALCULATIONS & ANCILLARY FEES',
        '',
        '3. SAMPLE COMMISSION CALCULATIONS (AT 2% RATE)',
        'To assist clients with financial planning, below are exact commission calculations based on current listings:',
        '- Maple Residency (Price: PKR 42,000,000):',
        '  Sales Commission (2%) = PKR 42,000,000 x 0.02 = PKR 840,000',
        '- Cedar Heights (Price: PKR 46,500,000):',
        '  Sales Commission (2%) = PKR 46,500,000 x 0.02 = PKR 930,000',
        '- Lakeview Apartments (Price: PKR 49,500,000):',
        '  Sales Commission (2%) = PKR 49,500,000 x 0.02 = PKR 990,000',
        '- Pine Villas (Price: PKR 62,000,000):',
        '  Sales Commission (2%) = PKR 62,000,000 x 0.02 = PKR 1,240,000',
        '',
        '4. ANCILLARY & TRANSACTIONAL EXPENSES',
        '- Government Transfer & Stamp Duties: Payable directly to provincial and municipal authorities (CDA/RDA/Registrar) per prevailing statutory rates.',
        '- Legal Document Drafting & Vetting: Included complimentarily for clients utilizing our full 2% brokerage mandate.',
        '- Expedited NOC Clearance Assistance: Fixed facilitation fee of PKR 50,000 where specialized expedited municipal coordination is required.'
      ]
    ]
  },
  {
    filename: 'FAQs.pdf',
    title: 'NORTHSTAR ESTATES — FREQUENTLY ASKED QUESTIONS (FAQ)',
    pages: [
      [
        'NORTHSTAR ESTATES',
        'Client Frequently Asked Questions & Operational Guidelines',
        '',
        'Q1: What is Northstar Estates?',
        'Answer: Northstar Estates is an institutional luxury real estate advisory and brokerage firm founded in 2018 in Islamabad, Pakistan. It specializes in luxury residential acquisitions, verified title conveyance, and premium property sales across Islamabad and Rawalpindi.',
        '',
        'Q2: What services does Northstar Estates provide?',
        'Answer: Northstar Estates provides buyer representation, exclusive seller listing brokerage, CDA/RDA title deed verification and due diligence, property valuation, asset management, and overseas client remote closing facilitation.',
        '',
        'Q3: What is the sales commission charged by Northstar Estates?',
        'Answer: The standard sales commission is strictly 2% of the final verified property transaction value, payable upon execution of transfer.',
        '',
        'Q4: What is the property viewing policy?',
        'Answer: In accordance with our security and client privacy guidelines, all property viewings must be scheduled at least 24 hours in advance through an authorized Northstar real estate advisor. Guided viewings take place Monday through Saturday from 10:00 AM to 6:00 PM. Prospective buyers must provide valid government-issued photographic identification (CNIC or Passport) prior to entering gated private communities or occupied residences.'
      ],
      [
        'NORTHSTAR ESTATES — FAQS (CONTINUED)',
        '',
        'Q5: What documents are required for a property purchase?',
        'Answer: To complete a property purchase through Northstar Estates, the purchasing party must submit:',
        '1. Clear attested copies of valid Computerized National Identity Card (CNIC) or National Identity Card for Overseas Pakistanis (NICOP).',
        '2. Two recent passport-sized color photographs.',
        '3. Verified Source of Funds declaration / bank transaction record.',
        '4. Active Taxpayer NTN verification certificate (FBR Active Taxpayers List status).',
        '5. Completed and signed Northstar Estates Buyer Registration Dossier and Agreement to Sell.',
        '',
        'Q6: Can overseas Pakistanis purchase properties without traveling to Pakistan?',
        'Answer: Yes. Northstar Estates facilitates remote acquisitions through verified Special Power of Attorney (PoA) attested by the relevant Pakistani Embassy or Consulate abroad and counter-attested by the Ministry of Foreign Affairs (MOFA) in Pakistan.',
        '',
        'Q7: How long does a standard property transfer take?',
        'Answer: Following full financial clearance and title verification, municipal transfer at CDA or Bahria Town typically completes within 14 to 21 business days.'
      ]
    ]
  },
  {
    filename: 'Policies_and_Terms.pdf',
    title: 'NORTHSTAR ESTATES — POLICIES, TERMS & CONDITIONS',
    pages: [
      [
        'NORTHSTAR ESTATES',
        'Official Transaction Policies, Terms of Engagement & Reservation Protocol',
        '',
        '1. PROPERTY RESERVATION POLICY',
        'To officially reserve any property listed by Northstar Estates and take it off active marketing:',
        '- The buyer must tender a formal Expression of Interest (EOI) accompanied by a 5% refundable earnest deposit (Token money), or a minimum of PKR 1,000,000 for apartments.',
        '- Upon receipt of the reservation deposit, the property is locked exclusively for 14 calendar days to facilitate comprehensive legal scrutiny, title search, and bank pay-order preparation.',
        '- If legal defects or encumbrances are discovered during the 14-day due diligence window, 100% of the token deposit is refunded immediately.',
        '- If the buyer voluntarily defaults or abandons the transaction after successful due diligence without valid legal cause, the deposit is subject to forfeiture according to standard real estate convention.',
        '',
        '2. TITLE GUARANTEE & DUE DILIGENCE POLICY',
        '- Northstar Estates mandates that every property listed under its exclusive roster must possess verified title deeds, non-encumbrance certificates (NEC), and approved building plans from CDA or RDA.',
        '- Direct verification is executed at the registrar office before receiving any transfer payments.'
      ],
      [
        'NORTHSTAR ESTATES — COMPLIANCE & LEGAL GOVERNANCE',
        '',
        '3. PAYMENT METHODS & ANTI-MONEY LAUNDERING (AML)',
        '- All transaction payments, token deposits, and commission settlements must be conducted exclusively via crossed banking instruments (Pay Order / Demand Draft / Direct Bank Wire) drawn on regulated commercial banking institutions.',
        '- Cash transactions exceeding statutory limits established by the Financial Action Task Force (FATF) and State Bank of Pakistan are strictly prohibited.',
        '',
        '4. JURISDICTION & DISPUTE RESOLUTION',
        '- All engagements with Northstar Estates are governed by the substantive laws of the Islamic Republic of Pakistan.',
        '- Any unresolved legal controversy or claim arising out of advisory agreements shall be submitted to binding arbitration in Islamabad under the Arbitration Act 1940 prior to seeking judicial relief in the Courts of Islamabad.'
      ]
    ]
  }
];

async function generateAll() {
  for (const item of docsData) {
    const pdfDoc = await PDFDocument.create();
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    for (let pageIdx = 0; pageIdx < item.pages.length; pageIdx++) {
      const pageLines = item.pages[pageIdx];
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
      const { height } = page.getSize();
      
      let y = height - 50;

      // Header
      page.drawText(item.title, {
        x: 50,
        y,
        size: 9,
        font: fontBold,
        color: rgb(0.08, 0.72, 0.65), // Teal #14B8A6
      });
      y -= 15;
      page.drawLine({
        start: { x: 50, y },
        end: { x: 545, y },
        thickness: 0.75,
        color: rgb(0.8, 0.8, 0.8),
      });
      y -= 25;

      for (const line of pageLines) {
        if (line === '') {
          y -= 12;
          continue;
        }

        const isHeading = line.startsWith('PROPERTY') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.') || line.startsWith('6.') || line.startsWith('NORTHSTAR') || line.startsWith('Q') || line.startsWith('SUMMARY');
        const font = isHeading ? fontBold : fontRegular;
        const size = isHeading ? (line.startsWith('NORTHSTAR') ? 14 : 11) : 9.5;
        const color = isHeading ? rgb(0.05, 0.05, 0.05) : rgb(0.2, 0.2, 0.2);

        // Simple word wrap
        const words = line.split(' ');
        let currentLine = '';
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const width = font.widthOfTextAtSize(testLine, size);
          if (width > 490) {
            page.drawText(currentLine, { x: 50, y, size, font, color });
            y -= (size + 5);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          page.drawText(currentLine, { x: 50, y, size, font, color });
          y -= (size + 6);
        }

        if (y < 60) break;
      }

      // Footer
      page.drawLine({
        start: { x: 50, y: 40 },
        end: { x: 545, y: 40 },
        thickness: 0.5,
        color: rgb(0.85, 0.85, 0.85),
      });
      page.drawText(`Page ${pageIdx + 1} of ${item.pages.length} — Confidential & Verified Client Copy — Northstar Estates`, {
        x: 50,
        y: 28,
        size: 8,
        font: fontRegular,
        color: rgb(0.45, 0.45, 0.45),
      });
    }

    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(SAMPLE_DIR, item.filename);
    fs.writeFileSync(filePath, pdfBytes);
    console.log(`Generated: ${item.filename} (${pdfBytes.length} bytes, ${item.pages.length} pages)`);
  }
}

generateAll().catch(console.error);
