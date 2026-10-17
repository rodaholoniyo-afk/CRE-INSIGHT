
/* ==========================================
   CRE INSIGHT: USA PROPERTY CASE STUDY
   Property: Dallas Office Building, Texas
   Currency: US Dollars (USD)
   ========================================== */

function runPropertyCaseStudy() {
  // 1. SAMPLE USA COMMERCIAL PROPERTY DATA
  const property = {
    name: "Dallas Office Building",
    propertyType: "Commercial Office",
    location: "Dallas, Texas, USA",
    purchasePrice: 2500000,
    annualRentalIncome: 300000,
    vacancyRate: 5,
    otherAnnualIncome: 10000,
    annualOperatingExpenses: 90000
  };

  // 2. VALIDATE PROPERTY DATA
  const numericInputs = [
    property.purchasePrice,
    property.annualRentalIncome,
    property.vacancyRate,
    property.otherAnnualIncome,
    property.annualOperatingExpenses
  ];

  if (
    !property.name ||
    numericInputs.some(
      value => !Number.isFinite(value) || value < 0
    ) ||
    property.purchasePrice <= 0 ||
    property.vacancyRate > 100
  ) {
    console.error("Invalid property data. Check the inputs.");
    return null;
  }

  // 3. CALCULATE PROPERTY FINANCIALS
  const potentialRentalIncome = property.annualRentalIncome;

  const vacancyLoss =
    potentialRentalIncome * (property.vacancyRate / 100);

  const effectiveRentalIncome =
    potentialRentalIncome - vacancyLoss;

  const effectiveGrossIncome =
    effectiveRentalIncome + property.otherAnnualIncome;

  const noi =
    effectiveGrossIncome - property.annualOperatingExpenses;

  const capRate =
    (noi / property.purchasePrice) * 100;

  // 4. FORMAT RESULTS IN US DOLLARS
  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  });

  // 5. DISPLAY RESULTS IN BROWSER CONSOLE
  console.group("CRE INSIGHT — USA PROPERTY CASE STUDY");

  console.log("PROPERTY DETAILS");
  console.table({
    "Property Name": property.name,
    "Property Type": property.propertyType,
    "Location": property.location,
    "Currency": "USD"
  });

  console.log("INCOME AND OPERATING EXPENSES");
  console.table({
    "Potential Annual Rental Income":
      usd.format(potentialRentalIncome),

    "Vacancy Loss":
      usd.format(vacancyLoss),

    "Effective Rental Income":
      usd.format(effectiveRentalIncome),

    "Other Annual Income":
      usd.format(property.otherAnnualIncome),

    "Effective Gross Income":
      usd.format(effectiveGrossIncome),

    "Annual Operating Expenses":
      usd.format(property.annualOperatingExpenses)
  });

  console.log("UNDERWRITING RESULTS");
  console.table({
    "Purchase Price": usd.format(property.purchasePrice),
    "Net Operating Income (NOI)": usd.format(noi),
    "Capitalization Rate": capRate.toFixed(2) + "%"
  });

  console.log(
    "Investment Summary:",
    noi > 0
      ? "Positive operating income before financing."
      : noi === 0
        ? "Operating break-even."
        : "Negative operating income."
  );

  console.groupEnd();

  // 6. RETURN RESULTS FOR FUTURE USE
  return {
    property,
    potentialRentalIncome,
    vacancyLoss,
    effectiveRentalIncome,
    effectiveGrossIncome,
    noi,
    capRate
  };
}

// Automatically run the case study when the script loads.
const caseStudyResults = runPropertyCaseStudy();
