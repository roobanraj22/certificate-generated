async function generateCertificate() {
  const name = document.getElementById("nameInput").value.trim();
  const course = document.getElementById("courseInput").value.trim();
  const certName = document.getElementById("certName");
  const certCourse = document.getElementById("certCourse");
  const certificate = document.getElementById("certificate");
  const downloadBtn = document.getElementById("downloadBtn");
  const date = document.getElementById("date");

  if (!name || !course) {
    alert("Please fill in all fields!");
    return;
  }

  certName.textContent = name;
  certCourse.textContent = course;
  date.textContent = new Date().toLocaleDateString();

  certificate.style.display = "block";
  downloadBtn.style.display = "inline-block";

  // Smooth scroll to certificate
  certificate.scrollIntoView({ behavior: "smooth" });
}

async function downloadPDF() {
  const certificate = document.getElementById("certificate");
  const { jsPDF } = window.jspdf;

  // Take screenshot of the certificate
  const canvas = await html2canvas(certificate, {
    scale: 2,           // Higher resolution
    useCORS: true,      // Allow logo images
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");

  // Create landscape PDF
  const pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

  // Trigger download
  pdf.save("Certificate.pdf");
}
