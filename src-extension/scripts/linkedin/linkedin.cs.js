function cleanString(str) {
  if (!str) return "";
  return str.replace(/\\n|\s+/g, " ").trim();
}

function getCompanyInfo() {
  const jobId = new URLSearchParams(window.location.search).get("currentJobId");
  const name = document.querySelector(
    `[data-job-id="${jobId}"] .artdeco-entity-lockup__subtitle span`
  ).innerHTML;

  return {
    name: cleanString(name),
  };
}

function getAllJobInformation() {
  const companyInfo = getCompanyInfo();

  return {
    companyInfo,
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "urlChanged") {
    const jobInformation = getAllJobInformation();
    try {
      chrome.runtime.sendMessage({
        action: "print-job-info",
        platform: "linkedin",
        payload: jobInformation,
      });
    } catch (error) {
      console.log(error);
      alert("ERRROR");
    }
  }
});
