import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import html2canvas from 'html2canvas'; // Import html2canvas

export const generatePdf = async (htmlContent) => {
    const doc = new jsPDF();
    doc.html(htmlContent, {
        callback: function (doc) {
          doc.save();
        },
        x: 10,
        y: 10
     });
};
