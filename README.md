
# CRE Insight
### Commercial Real Estate Underwriting and Virtual Assistant Dashboard

## 1. Project Overview

CRE Insight is a beginner-friendly web application designed to support commercial real estate property analysis and basic task management.

The dashboard allows users to enter property financial information, calculate important investment metrics, view operating expenses, and receive basic guidance from a rule-based virtual assistant.

The project demonstrates how HTML, CSS, and JavaScript can be used to build a simple financial analysis tool.

## 2. Project Objectives

- Calculate effective property income.
- Calculate Net Operating Income (NOI).
- Calculate the capitalization rate (cap rate).
- Display and summarize operating expenses.
- Provide basic property insights through a virtual assistant.
- Manage underwriting tasks.
- Display calculation results in the browser console.

## 3. Features

### Dashboard Overview
Displays key financial results, including effective income, NOI, and cap rate.

### Property Underwriting
Allows users to enter:
- Purchase price
- Annual rental income
- Vacancy rate
- Other income

### Expense Breakdown
Allows users to enter:
- Property taxes
- Insurance
- Maintenance
- Management fees
- Other operating expenses

### Virtual Assistant
Provides predefined guidance based on the user's question and current property figures.

Example questions:
- Review my property
- How can I reduce expenses?
- What should I do next?

### Task Manager
Users can add tasks, mark them as complete, reopen completed tasks, and delete tasks.

### Browser Console Report
Displays property calculations, assistant questions and responses, and task activity in the browser developer console.

## 4. Technologies Used

- **HTML5:** Creates the structure of the dashboard.
- **CSS3:** Provides styling and responsive layouts.
- **JavaScript:** Performs financial calculations, handles user interactions, powers the rule-based assistant, and logs results.

No external libraries or database are required for the basic version.

## 5. Financial Calculations

### Effective Income

Effective income is calculated by subtracting vacancy losses from rental income and adding other income.

Formula:

Effective Income = Annual Rent × (1 − Vacancy Rate / 100) + Other Income

### Operating Expenses

Total Operating Expenses = Property Taxes + Insurance + Maintenance + Management Fees + Other Expenses

### Net Operating Income (NOI)

NOI = Effective Income − Operating Expenses

### Capitalization Rate

Cap Rate = (NOI / Purchase Price) × 100

The cap rate is calculated only when the purchase price is greater than zero.

## 6. Example Property

The dashboard starts with illustrative values:

| Item | Example Value |
|---|---:|
| Purchase Price | $2,500,000 |
| Annual Rental Income | $300,000 |
| Vacancy Rate | 5% |
| Other Income | $10,000 |
| Operating Expenses | $90,000 |
| Effective Income | $295,000 |
| Net Operating Income | $205,000 |
| Capitalization Rate | 8.20% |

These figures are examples for demonstration purposes and are not verified market data or investment recommendations.

## 7. Project Structure

The project contains the following files:

```text
CRE-Insight/
├── index.html
├── style.css
├── script.js
└── README.md
```

- `index.html` contains the dashboard sections and input fields.
- `style.css` controls the dashboard appearance and mobile layout.
- `script.js` contains the financial calculations, virtual assistant, task manager, and console reporting.
- `README.md` documents the project and explains how to use it.

## 8. How to Run the Project

1. Download or clone the project repository.
2. Open the project folder in Visual Studio Code or another code editor.
3. Confirm that all three application files are in the same folder.
4. Open `index.html` in a web browser.
5. Enter or change the property financial figures.
6. Review the updated results on the dashboard.
7. Use the virtual assistant to request a property review.
8. Add and manage underwriting tasks.

### Viewing Console Output

1. Open the dashboard in Chrome.
2. Press `F12`, or right-click the page and select **Inspect**.
3. Select the **Console** tab.
4. Refresh the page to view the initial financial report.
5. Change a financial input or ask the virtual assistant a question to generate further output.

## 9. Virtual Assistant Logic

The virtual assistant uses simple JavaScript conditions and keyword matching to identify common questions.

It then generates predefined responses using the property's current financial figures.

This is a rule-based assistant, not a generative AI model. It does not connect to an external AI service or independently retrieve market information.

## 10. Limitations

The current version is a basic educational prototype.

It does not yet include:
- Mortgage and debt amortization calculations
- Cash-on-cash return
- Internal Rate of Return (IRR)
- Multi-year cash flow projections
- Exit valuation and sensitivity analysis
- A database or permanent task storage
- Live property-market data
- An external AI-powered assistant

The dashboard should not be used as the sole basis for an investment decision.

## 11. Future Improvements

Possible improvements include:
- Adding financing and loan calculations
- Introducing multi-year investment projections
- Adding charts for income and expenses
- Saving tasks between sessions
- Connecting to verified property-market data
- Integrating an AI service for more flexible assistant responses

## 12. Deployment

The project can be hosted using GitHub Pages.

General steps:

1. Upload the project files to a GitHub repository.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Configure deployment from the `main` branch and the root folder.
5. Save the settings and wait for deployment to finish.

Ensure that the homepage file is named `index.html`.

## 13. Author and Purpose

**Project:** CRE Insight — Commercial Real Estate Underwriting and Virtual Assistant Dashboard

**Purpose:** Educational project demonstrating basic real estate financial analysis, frontend web development, console reporting, and task management.

## 14. Disclaimer

CRE Insight is an educational tool. All example financial figures are illustrative. Users should verify financial inputs and consult qualified professionals before making real estate investment decisions.
```

##  Final checklist

Before uploading your project to GitHub, make sure your repository contains all four files:

- [ ] `index.html`
- [ ] `style.css`
- [ ] `script.js`
- [ ] `README.md`