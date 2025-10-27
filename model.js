document.getElementById("generateBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const course = document.getElementById("courseInput").value.trim();
  const cert = document.getElementById("certificate");
  const date = document.getElementById("date");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!name || !course) {
    alert("Please enter both name and course!");
    return;
  }

  document.getElementById("certName").innerText = name;
  document.getElementById("certCourse").innerText = course;
  date.innerText = new Date().toLocaleDateString();

  cert.style.display = "block";
  downloadBtn.style.display = "inline-block";

  cert.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("downloadBtn").addEventListener("click", async () => {
  const cert = document.getElementById("certificate");
  const { jsPDF } = window.jspdf;

  // Render high-resolution image
  const canvas = await html2canvas(cert, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#fff"
  });

  const imgData = canvas.toDataURL("image/png", 1.0);
  const pdf = new jsPDF("landscape", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

  const finalWidth = imgWidth * ratio;
  const finalHeight = imgHeight * ratio;

  const x = (pdfWidth - finalWidth) / 2;
  const y = (pdfHeight - finalHeight) / 2;

  pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
  pdf.save("Certificate.pdf");
});
