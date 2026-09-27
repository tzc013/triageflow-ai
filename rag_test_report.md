# VERIDOC AI — RAG Evaluation & Grounding Benchmark Report

**Platform Under Test**: VERIDOC AI (Northstar Estates Knowledge Base)  
**Corpus**: 5 Documents (Company Overview, Property Listings, Services and Fees, FAQs, Policies and Terms)  
**Total Pages**: 11  
**Total Chunks**: 9  
**Vector Dimension**: 384-d Dense Embeddings  
**Grounding Model**: Gemini 3.8 Flash (temperature: 0.1)  

---

## Benchmark Results (15/15 Passed — 100% Accuracy)

| # | Category | Query | Expected Outcome | Verified Result | Status |
|---|---|---|---|---|---|
| 1 | Factual Retrieval | What is the price of Maple Residency? | PKR 42,000,000 | Confirmed PKR 42,000,000 cited from Property_Listings.pdf (p. 1) | PASS |
| 2 | Factual Retrieval | How many bedrooms does Cedar Heights have? | 4 bedrooms | Confirmed 4 bedrooms cited from Property_Listings.pdf (p. 1) | PASS |
| 3 | Policy Retrieval | What is the sales commission charged by Northstar Estates? | 2% of final transaction value | Confirmed 2% cited from Services_and_Fees.pdf & FAQs.pdf | PASS |
| 4 | Policy Retrieval | What is the property viewing policy? | 24h advance notice, 10am-6pm Mon-Sat, CNIC/photo ID | Confirmed exact terms cited from FAQs.pdf (p. 1) | PASS |
| 5 | Complex Extraction | What documents are required for a property purchase? | CNIC/NICOP, 2 photos, Source of Funds, Taxpayer NTN, Buyer registration dossier | Confirmed 5 requirements cited from FAQs.pdf (p. 2) | PASS |
| 6 | Multi-Entity Filtering | Which properties are located in Islamabad and priced below PKR 50 million? | Maple Residency (42M), Cedar Heights (46.5M), Lakeview Apartments (49.5M) | Confirmed 3 Islamabad properties identified and Pine Villas (Rawalpindi 62M) excluded | PASS |
| 7 | Cross-Document Reasoning | What is the sales commission amount for Maple Residency? | PKR 840,000 (PKR 42,000,000 × 2%) | Confirmed PKR 840,000 computed and both Property_Listings and Services_and_Fees cited | PASS |
| 8 | Comparative Analysis | Compare Maple Residency and Cedar Heights in terms of bedrooms, price, and location. | Structured comparison across bedrooms, price, and location | Confirmed comparative table comparing Sector F-11 vs E-11, 3 vs 4 beds, 42M vs 46.5M | PASS |
| 9 | Policy Retrieval | What is the reservation deposit policy? | 5% token deposit (min 1M), 14-day lock, refundable for title defects | Confirmed policy cited from Policies_and_Terms.pdf (p. 1) | PASS |
| 10 | Hallucination Resistance | What was Northstar Estates' total revenue in 2025? | Refusal: Information not found in uploaded documents | Confirmed refusal returned with ZERO fabricated citations | PASS |
| 11 | Hallucination Resistance | Who founded Northstar Estates? | Refusal: Information not found in uploaded documents | Confirmed refusal returned with ZERO fabricated citations | PASS |
| 12 | Hallucination Resistance | Which university did the founder attend? | Refusal: Information not found in uploaded documents | Confirmed refusal returned with ZERO fabricated citations | PASS |
| 13 | Factual Retrieval | What is the price of Pine Villas? | PKR 62,000,000 | Confirmed PKR 62,000,000 cited from Property_Listings.pdf (p. 2) | PASS |
| 14 | Analytical Ranking | Which property is the most expensive? | Pine Villas (PKR 62,000,000, Rawalpindi) | Confirmed Pine Villas correctly ranked as #1 highest price in portfolio | PASS |
| 15 | Comprehensive Synthesis | What services does Northstar Estates provide? | Buyer rep, seller listing, title due diligence, valuation, overseas PoA concierge | Confirmed all 5 operational pillars cited from Services_and_Fees.pdf & FAQs.pdf | PASS |

---

## Hallucination Safeguard Validation
- Tests #10, #11, and #12 explicitly probe non-existent data points.
- In 100% of negative tests, VERIDOC AI resisted generative confabulation, properly acknowledging that the documentation does not disclose future revenue, founder identity, or university attendance.
- **Zero phantom citations** were created for unsubstantiated claims.
