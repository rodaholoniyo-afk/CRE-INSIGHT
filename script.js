
"use strict";

// ==========================================
// CRE INSIGHT - START THE APPLICATION
// ==========================================

console.log("CRE Insight JavaScript file loaded.");

// Wait until the HTML page is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("CRE Insight application started.");

  // Format numbers as dollars
  function formatMoney(amount) {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2
    });
  }

  // Read a number safely from an HTML input
  function getNumber(id) {
    const element = document.getElementById(id);

    if (!element) {
      console.error("Missing HTML element:", id);
      return 0;
    }

    const value = Number(element.value);

    return Number.isFinite(value) ? Math.max(0, value) : 0;
  }

  // ==========================================
  // PROPERTY CALCULATIONS AND CONSOLE REPORT
  // ==========================================

  function calculateProperty() {
    const purchasePrice = getNumber("purchasePrice");
    const annualRent = getNumber("annualRent");
    const vacancyRate = Math.min(getNumber("vacancyRate"), 100);
    const otherIncome = getNumber("otherIncome");

    const expenses =
      getNumber("propertyTax") +
      getNumber("insurance") +
      getNumber("maintenance") +
      getNumber("management") +
      getNumber("otherExpenses");

    const effectiveIncome =
      annualRent * (1 - vacancyRate / 100) + otherIncome;

    const noi = effectiveIncome - expenses;

    const capRate =
      purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0;

    // Update the dashboard
    const results = {
      incomeResult: formatMoney(effectiveIncome),
      noiResult: formatMoney(noi),
      capRateResult: capRate.toFixed(2) + "%",
      expensesResult: formatMoney(expenses)
    };

    Object.entries(results).forEach(function ([id, value]) {
      const element = document.getElementById(id);

      if (element) {
        element.textContent = value;
      } else {
        console.error("Missing dashboard result element:", id);
      }
    });

    // Print a readable report in the browser console
    console.log("========== CRE INSIGHT REPORT ==========");

    console.table([
      { Metric: "Purchase Price", Value: formatMoney(purchasePrice) },
      { Metric: "Annual Rental Income", Value: formatMoney(annualRent) },
      { Metric: "Vacancy Rate", Value: vacancyRate + "%" },
      { Metric: "Other Income", Value: formatMoney(otherIncome) },
      { Metric: "Effective Income", Value: formatMoney(effectiveIncome) },
      { Metric: "Operating Expenses", Value: formatMoney(expenses) },
      { Metric: "Net Operating Income", Value: formatMoney(noi) },
      { Metric: "Capitalization Rate", Value: capRate.toFixed(2) + "%" }
    ]);

    console.log("========== END OF REPORT ==========");

    return {
      purchasePrice,
      annualRent,
      vacancyRate,
      otherIncome,
      effectiveIncome,
      expenses,
      noi,
      capRate
    };
  }

  // Update calculations when financial inputs change
  document.querySelectorAll('input[type="number"]').forEach(
    function (input) {
      input.addEventListener("input", calculateProperty);
    }
  );

  // ==========================================
  // VIRTUAL ASSISTANT
  // ==========================================

  function getAssistantAnswer(question) {
    const data = calculateProperty();
    const text = question.toLowerCase();

    if (
      text.includes("review") ||
      text.includes("property") ||
      text.includes("performance") ||
      text.includes("noi") ||
      text.includes("cap rate")
    ) {
      const observation = data.noi < 0
        ? "Expenses exceed effective income. Check the figures and investigate the causes."
        : "The property has a positive NOI based on the figures entered. Compare its cap rate with similar properties.";

      return (
        "PROPERTY REVIEW\n" +
        "Effective income: " + formatMoney(data.effectiveIncome) + "\n" +
        "Operating expenses: " + formatMoney(data.expenses) + "\n" +
        "NOI: " + formatMoney(data.noi) + "\n" +
        "Cap rate: " + data.capRate.toFixed(2) + "%\n\n" +
        observation
      );
    }

    if (
      text.includes("expense") ||
      text.includes("cost") ||
      text.includes("reduce")
    ) {
      return (
        "EXPENSE REVIEW\n" +
        "Total operating expenses: " + formatMoney(data.expenses) + "\n\n" +
        "Suggested checks:\n" +
        "1. Review taxes and insurance.\n" +
        "2. Check maintenance invoices.\n" +
        "3. Review management fees.\n" +
        "4. Compare costs with similar properties."
      );
    }

    if (
      text.includes("next") ||
      text.includes("task") ||
      text.includes("recommend") ||
      text.includes("should")
    ) {
      return (
        "SUGGESTED NEXT STEP\n" +
        (data.vacancyRate > 5
          ? "Review occupancy, leasing performance, and lease expirations."
          : "Verify income and expense figures, then compare the cap rate with similar properties.") +
        "\n\nYou can add this recommendation to your Task Manager."
      );
    }

    return (
      "I can help review your property, operating expenses, NOI, cap rate, or next steps. " +
      "Try asking: Review my property."
    );
  }

  function showMessage(message, className) {
    const messages = document.getElementById("assistantMessages");

    if (!messages) {
      console.error("Missing HTML element: assistantMessages");
      return;
    }

    const paragraph = document.createElement("p");
    paragraph.className = className;
    paragraph.textContent = message;

    messages.appendChild(paragraph);
    messages.scrollTop = messages.scrollHeight;
  }

  function askAssistant(question) {
    const cleanedQuestion = question.trim();

    if (!cleanedQuestion) {
      console.warn("Enter a question for the virtual assistant.");
      return;
    }

    console.log("ASSISTANT QUESTION:", cleanedQuestion);

    showMessage(cleanedQuestion, "user-message");

    const answer = getAssistantAnswer(cleanedQuestion);

    showMessage(answer, "assistant-message");

    console.log("ASSISTANT RESPONSE:\n" + answer);
  }

  const askButton = document.getElementById("askAssistantButton");
  const assistantInput = document.getElementById("assistantInput");

  if (askButton && assistantInput) {
    askButton.addEventListener("click", function () {
      askAssistant(assistantInput.value);
      assistantInput.value = "";
    });

    assistantInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        askButton.click();
      }
    });
  } else {
    console.error(
      "Virtual assistant controls are missing. Check index.html."
    );
  }

  // Connect the suggested-question buttons
  document.querySelectorAll(".question-button").forEach(
    function (button) {
      button.addEventListener("click", function () {
        askAssistant(button.dataset.question || button.textContent);
      });
    }
  );

  // ==========================================
  // TASK MANAGER
  // ==========================================

  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (!taskInput || !taskList) {
      console.error("Task manager HTML elements are missing.");
      return;
    }

    const taskText = taskInput.value.trim();

    if (!taskText) {
      console.warn("Enter a task before clicking Add Task.");
      return;
    }

    const listItem = document.createElement("li");
    const taskLabel = document.createElement("span");
    const completeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    taskLabel.textContent = taskText;

    completeButton.textContent = "Complete";

    completeButton.addEventListener("click", function () {
      listItem.classList.toggle("completed");

      const completed = listItem.classList.contains("completed");

      completeButton.textContent = completed ? "Reopen" : "Complete";

      console.log(
        completed ? "TASK COMPLETED:" : "TASK REOPENED:",
        taskText
      );
    });

    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
      console.log("TASK DELETED:", taskText);
      listItem.remove();
    });

    listItem.appendChild(taskLabel);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    console.log("NEW TASK ADDED:", taskText);

    taskInput.value = "";
  }

  const addTaskButton = document.getElementById("addTaskButton");
  const taskInput = document.getElementById("taskInput");

  if (addTaskButton && taskInput) {
    addTaskButton.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  } else {
    console.error("Task manager controls are missing. Check index.html.");
  }

  // ==========================================
  // INITIALISE THE DASHBOARD
  // ==========================================

  calculateProperty();

  console.log("CRE Insight is ready.");
});
