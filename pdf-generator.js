/**
 * PDF Generator for Interior Design Quotes
 * Uses jsPDF library to generate professional PDF quotes
 */

// Configuration constants for easy editing
const PDF_CONFIG = {
    // Company details
    COMPANY_NAME: "Kreative Solution",
    COMPANY_ADDRESS: "40/3 DABOLIM GOA",
    COMPANY_PHONE: "+91 9975888247",
    COMPANY_EMAIL: "padma@kreativesolution.in",
    COMPANY_WEBSITE: "www.kreativesolution.in",
    COMPANY_WEBSITE_URL: "https://www.kreativesolution.in",
    WhatApp_URL: "https://wa.me/919975888247?text=Hi%2C%20I%E2%80%99m%20interested%20in%20your%20architecture%20and%20interior%20design%20services.",

    // PDF formatting
    BRAND_COLOR: [102, 126, 234], // RGB values
    PDF_TITLE: "ESTIMATE INTERIOR",
    
    // Page layout settings
    MARGINS: {
        TOP: 20,    // Top margin in mm
        BOTTOM: 20, // Bottom margin in mm
        LEFT: 20,   // Left margin in mm
        RIGHT: 20   // Right margin in mm
    },
    
    // Standard spacing
    SPACING: {
        SECTION: 15,      // Space between major sections
        PARAGRAPH: 8,     // Space between paragraphs
        LINE: 5,          // Space between lines
        TITLE_GAP: 10     // Space after titles
    },
    
    // Terms and conditions
    TERMS_CONDITIONS: [
        "This quotation is valid for 30 days from the date of generation",
        "Final pricing may vary based on actual site measurements",
        "50% advance payment required to start the work",
        "40 % Payment to be made once raw material is moved to site",
        "10% balance payment to be made after completion of work"
    ],
    
    // Footer text
    FOOTER_TEXT: "Please connect with us through WhatsApp, Call or Email for more information!"
};

class PDFGenerator {
    constructor() {
        this.doc = null;
        this.pageWidth = 210;  // A4 width in mm
        this.pageHeight = 297; // A4 height in mm
        
        // Use consistent margins from configuration
        this.leftMargin = PDF_CONFIG.MARGINS.LEFT;
        this.rightMargin = PDF_CONFIG.MARGINS.RIGHT;
        this.topMargin = PDF_CONFIG.MARGINS.TOP;
        this.bottomMargin = PDF_CONFIG.MARGINS.BOTTOM;
        
        // Calculate usable page area
        this.usableWidth = this.pageWidth - this.leftMargin - this.rightMargin;
        
        this.currentY = 0;
        this.totalPages = 0; // Track total pages for page numbering
    }

    async generateQuotePDF(quoteData) {
        // Wait a moment for library to fully load
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if jsPDF is loaded - try multiple possible ways
        let jsPDFLib;
        
        console.log('Checking jsPDF availability...');
        console.log('window.jsPDF:', typeof window.jsPDF);
        console.log('window.jspdf:', typeof window.jspdf);
        console.log('jsPDF:', typeof jsPDF);
        
        if (typeof window.jsPDF !== 'undefined') {
            jsPDFLib = window.jsPDF;
            console.log('Using window.jsPDF');
        } else if (typeof window.jspdf?.jsPDF !== 'undefined') {
            jsPDFLib = window.jspdf.jsPDF;
            console.log('Using window.jspdf.jsPDF');
        } else if (typeof jsPDF !== 'undefined') {
            jsPDFLib = jsPDF;
            console.log('Using global jsPDF');
        } else {
            console.error('jsPDF library not found. Available objects:', Object.keys(window).filter(key => key.toLowerCase().includes('pdf')));
            alert('PDF library not loaded. Please refresh the page and try again.');
            return;
        }

        console.log('Using jsPDF library:', jsPDFLib);

        try {
            // Initialize jsPDF
            this.doc = new jsPDFLib();
            // ensure we use configured top margin
            this.currentY = this.topMargin;

            // Generate PDF content
            await this.addHeader();
            this.addCompanyInfo();
            this.addQuoteDetails(quoteData);
            this.addItemsTable(quoteData.items);
            this.addTotalSection(quoteData);
            this.addFooter();
            
            // Add page number to the last page (since addFooter doesn't automatically do it)
            this.addPageNumber();

            // Save the PDF
            const fileName = `Interior_Quote_${new Date().toISOString().split('T')[0]}.pdf`;
            this.doc.save(fileName);
            
            console.log('PDF generated successfully');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    }

    async addHeader() {
        // Start with proper top margin
        this.currentY = this.topMargin;

        // Title at the top with proper spacing
        this.doc.setFontSize(22);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(PDF_CONFIG.BRAND_COLOR[0], PDF_CONFIG.BRAND_COLOR[1], PDF_CONFIG.BRAND_COLOR[2]);
        this.doc.text(PDF_CONFIG.PDF_TITLE, this.pageWidth / 2, this.currentY, { align: 'center' });
        
        // Strapline under the main title (slightly smaller and centered)
        const strapline = 'We provide complete Interior Design and Execution In entire Goa.';
        // Choose a smaller font for the strapline based on length
        const strapFontSize = strapline.length > 60 ? 9 : 10;
        this.currentY += PDF_CONFIG.SPACING.LINE + 2; // small gap after title
    this.doc.setFontSize(strapFontSize);
    // Make the strapline bold as requested
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(80, 80, 80);
    this.doc.text(strapline, this.pageWidth / 2, this.currentY, { align: 'center' });
    // restore normal font for subsequent content
    this.doc.setFont('helvetica', 'normal');
        
        // Add horizontal line below the title with consistent spacing
        this.currentY += PDF_CONFIG.SPACING.LINE;
        this.doc.setDrawColor(200, 200, 200);
        this.doc.line(this.leftMargin, this.currentY, this.pageWidth - this.rightMargin, this.currentY);
        this.currentY += PDF_CONFIG.SPACING.SECTION;
        
        // Company logo (if available)
        try {
            // You can add logo loading logic here
            // const logoImg = await this.loadImage('assets/logo.png');
            // this.doc.addImage(logoImg, 'PNG', this.leftMargin, this.currentY, 40, 20);
        } catch (error) {
            console.log('Logo not found, proceeding without logo');
        }
    }

    addCompanyInfo() {
        // Make the company name more prominent: bold + larger size
        this.doc.setFontSize(11);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(0, 0, 0);
        // Company name on its own line
        this.doc.text(PDF_CONFIG.COMPANY_NAME, this.leftMargin, this.currentY);
        // Move down slightly and switch to normal font for remaining contact details
        this.currentY += PDF_CONFIG.SPACING.LINE + 2;
        this.doc.setFontSize(8); // Standard contact detail font
        this.doc.setFont('helvetica', 'normal');
        
        // Company details from configuration (company name already rendered above)
        const companyInfo = [
            PDF_CONFIG.COMPANY_ADDRESS,
            `Phone: ${PDF_CONFIG.COMPANY_PHONE}`,
            `Email: ${PDF_CONFIG.COMPANY_EMAIL}`,
            `${PDF_CONFIG.COMPANY_WEBSITE}`
        ];
        
        // Determine maximum width needed for company info for overlap prevention
        let maxWidth = 0;
        companyInfo.forEach(info => {
            const width = this.doc.getStringUnitWidth(info) * 8 / this.doc.internal.scaleFactor;
            if (width > maxWidth) maxWidth = width;
        });
        
    // Save starting Y position for quote details positioning later
    const startY = this.currentY;
        
        // Render all company info lines with consistent spacing
        companyInfo.forEach(info => {
            this.doc.text(info, this.leftMargin, this.currentY);
            this.currentY += PDF_CONFIG.SPACING.LINE; // Use standard line spacing
        });
        
        // Store company info width and starting Y for use in addQuoteDetails
        this.companyInfoWidth = maxWidth + 10; // Add some buffer space
        this.companyInfoStartY = startY;
        
        this.currentY += PDF_CONFIG.SPACING.PARAGRAPH; // Add paragraph spacing after company info
    }

    addQuoteDetails(quoteData) {
        // Create a clear separation between company info and quote details by using fixed positions
        const quoteStartY = this.companyInfoStartY;
        
        // Right side - Quote Details positioned with consistent alignment
        // Use a fixed position that's aligned with right margin
        const quoteDetailsX = this.pageWidth - this.rightMargin - 5;
        
        // Set font for details
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(8);
        
        // Quote details with consistent formatting
        const quoteDetails = [
            `Quote Date: ${new Date(quoteData.generatedAt).toLocaleDateString()}`,
            `Property Type: ${quoteData.propertyType.toUpperCase()}`,
            `Valid Until: ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}`
        ];
        
        // Start quote details at appropriate vertical position
        let detailY = quoteStartY;
        quoteDetails.forEach(detail => {
            this.doc.text(detail, quoteDetailsX, detailY, { align: 'right' });
            detailY += PDF_CONFIG.SPACING.LINE; // Use standard line spacing
        });
        
        // Calculate final Y position with appropriate section spacing
        this.currentY = Math.max(this.currentY, detailY) + PDF_CONFIG.SPACING.SECTION;
    }

    addItemsTable(items) {
        // Table header with consistent spacing
        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Items & Pricing:', this.leftMargin, this.currentY);
        this.currentY += PDF_CONFIG.SPACING.TITLE_GAP;
        
        // Group items by room
        const groupedItems = this.groupItemsByRoom(items);
        
        // Calculate optimal table layout using available width
        const availableWidth = this.usableWidth; // Use pre-calculated usable width
        
        // Optimized column widths using percentages of available width
        // 30% for Item, 50% for Specification, 20% for Amount
        const colWidthPercent = [0.3, 0.5, 0.2]; 
        const colWidths = colWidthPercent.map(percent => Math.floor(availableWidth * percent));
        
        // Ensure total width matches available width exactly
        const widthDiff = availableWidth - colWidths.reduce((a, b) => a + b, 0);
        colWidths[1] += widthDiff; // Add any rounding difference to the middle column
        
        // Calculate column positions
        const colX = [
            this.leftMargin, 
            this.leftMargin + colWidths[0], 
            this.leftMargin + colWidths[0] + colWidths[1]
        ];
        
        // Standard row height
        const rowHeight = 10;
        const tableWidth = availableWidth;
        
        // Process each room group
        Object.keys(groupedItems).forEach(roomName => {
            const roomItems = groupedItems[roomName];
            
            // Room header with proper formatting
            this.doc.setFillColor(PDF_CONFIG.BRAND_COLOR[0], PDF_CONFIG.BRAND_COLOR[1], PDF_CONFIG.BRAND_COLOR[2]);
            this.doc.setTextColor(255, 255, 255);
            this.doc.setFont('helvetica', 'bold');
            this.doc.setFontSize(10);
            
            // Draw room header background with proper margins
            this.doc.rect(this.leftMargin, this.currentY, tableWidth, rowHeight, 'F');
            
            // Center text vertically in the row
            const roomTitleY = this.currentY + (rowHeight * 0.6);
            this.doc.text(`${roomName}`, this.leftMargin + 4, roomTitleY);
            this.currentY += rowHeight;
            
            // Column headers with improved alignment
            this.doc.setFillColor(240, 240, 240);
            this.doc.setTextColor(0, 0, 0);
            this.doc.setFont('helvetica', 'bold');
            this.doc.setFontSize(8);
            
            // Draw column headers background
            this.doc.rect(this.leftMargin, this.currentY, tableWidth, rowHeight, 'F');
            
            // Center text vertically in the row
            const headerTextY = this.currentY + (rowHeight * 0.6);
            
            // Position column headers with consistent padding
            this.doc.text('Item', colX[0] + 4, headerTextY);
            this.doc.text('Specification', colX[1] + 4, headerTextY);
            
            // Center the Amount header in its column
            const amountColCenter = colX[2] + (colWidths[2] / 2);
            this.doc.text('Amount', amountColCenter, headerTextY, { align: 'center' });
            
            this.currentY += rowHeight;
            
            // Room items
            let roomSubtotal = 0;
            this.doc.setFont('helvetica', 'normal');
            this.doc.setFontSize(8); // Reduced font size for more compact display
            
            roomItems.forEach((item, index) => {
                // Calculate dynamic row height based on specification text
                const specText = item.size || '';
                const maxSpecWidth = colWidths[1] - 8; // Column width minus padding
                const splitText = this.doc.splitTextToSize(specText, maxSpecWidth);
                const numLines = Array.isArray(splitText) ? Math.min(splitText.length, 3) : 1;
                const dynamicRowHeight = Math.max(rowHeight, numLines * 4 + 4);
                
                // Check if we need a new page
                if (this.currentY + dynamicRowHeight > this.pageHeight - 60) {
                    this.addNewPage();
                }
                
                // Alternate row colors
                if (index % 2 === 0) {
                    this.doc.setFillColor(250, 250, 250);
                } else {
                    this.doc.setFillColor(255, 255, 255);
                }
                this.doc.rect(this.leftMargin, this.currentY, tableWidth, dynamicRowHeight, 'F');
                
                // Item details
                const itemName = item.type.charAt(0).toUpperCase() + item.type.slice(1);
                
                this.doc.setTextColor(0, 0, 0);
                
                // Item name (centered vertically in the row)
                const itemYPos = this.currentY + (dynamicRowHeight / 2) + 1;
                this.doc.text(itemName, colX[0] + 2, itemYPos);
                
                // Render specification text with proper line spacing
                if (Array.isArray(splitText)) {
                    const specStartY = this.currentY + 6;
                    splitText.forEach((line, lineIndex) => {
                        if (lineIndex < 3) { // Limit to 3 lines maximum
                            this.doc.text(line, colX[1] + 2, specStartY + (lineIndex * 4));
                        }
                    });
                } else {
                    this.doc.text(splitText, colX[1] + 2, itemYPos);
                }
                
                // Cost column (centered within the column)
                const costXPos = colX[2] + Math.min(colWidths[2] / 2, 5); // Center in Amount column with max offset
                this.doc.text(`Rs. ${Math.round(item.cost).toLocaleString()}`, costXPos, itemYPos);
                
                roomSubtotal += item.cost;
                this.currentY += dynamicRowHeight;
            });
            
            // Room subtotal with improved formatting
            this.doc.setFillColor(230, 230, 230);
            this.doc.setFont('helvetica', 'bold');
            this.doc.setFontSize(8);
            
            // Draw subtotal row background
            this.doc.rect(this.leftMargin, this.currentY, tableWidth, rowHeight, 'F');
            
            // Center text vertically
            const subtotalTextY = this.currentY + (rowHeight * 0.6);
            
            // Right-align the subtotal label to the end of the specification column
            const subtotalLabelX = colX[2] - 4;
            this.doc.text(`Subtotal:`, subtotalLabelX, subtotalTextY, { align: 'right' });
            
            // Center the amount in its column
            const subtotalAmountX = colX[2] + (colWidths[2] / 2);
            this.doc.text(`Rs. ${Math.round(roomSubtotal).toLocaleString()}`, subtotalAmountX, subtotalTextY, { align: 'center' });
            
            // Add consistent spacing after each room
            this.currentY += rowHeight + PDF_CONFIG.SPACING.PARAGRAPH;
        });
        
        // Draw table borders
        this.drawTableBorders(colX, colWidths, rowHeight);
        
        this.currentY += 10;
    }
    
    groupItemsByRoom(items) {
        const grouped = {};
        items.forEach(item => {
            if (!grouped[item.room]) {
                grouped[item.room] = [];
            }
            grouped[item.room].push(item);
        });
        return grouped;
    }
    
    wrapText(text, maxWidth) {
        if (!text) return [''];
        
        // Clean the text first
        const cleanText = text.replace(/\s+/g, ' ').trim();
        
        // Split by common separators for better formatting
        if (cleanText.includes(',')) {
            const parts = cleanText.split(',').map(part => part.trim());
            const lines = [];
            let currentLine = '';
            
            parts.forEach((part, index) => {
                const separator = index > 0 ? ', ' : '';
                const testLine = currentLine + separator + part;
                
                if (testLine.length <= maxWidth) {
                    currentLine = testLine;
                } else {
                    if (currentLine) {
                        lines.push(currentLine);
                    }
                    currentLine = part;
                }
            });
            
            if (currentLine) {
                lines.push(currentLine);
            }
            
            return lines.length > 0 ? lines : [cleanText];
        }
        
        // Fallback to word wrapping
        const words = cleanText.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            if (testLine.length <= maxWidth) {
                currentLine = testLine;
            } else {
                if (currentLine) {
                    lines.push(currentLine);
                }
                currentLine = word;
            }
        });
        
        if (currentLine) {
            lines.push(currentLine);
        }
        
        return lines.length > 0 ? lines : [cleanText];
    }
    
    drawTableBorders(colX, colWidths, rowHeight) {
        // This method can be used to draw additional borders if needed
        // For now, we're using filled rectangles which provide natural borders
    }

    addTotalSection(quoteData) {
        // Calculate room-wise totals
        const roomTotals = this.calculateRoomTotals(quoteData.items);
        
        // Calculate approximate space needed for the total section
        const roomCount = Object.keys(roomTotals).length;
        const spaceNeeded = 12 + // Cost Summary title
                           PDF_CONFIG.SPACING.TITLE_GAP + 
                           10 + // Room-wise Totals header
                           PDF_CONFIG.SPACING.PARAGRAPH +
                           (roomCount * PDF_CONFIG.SPACING.LINE) + // Room totals
                           PDF_CONFIG.SPACING.PARAGRAPH +
                           (quoteData.subtotal && quoteData.gst ? PDF_CONFIG.SPACING.PARAGRAPH * 2 : 0) + // Subtotal & GST
                           PDF_CONFIG.SPACING.PARAGRAPH + // Line
                           14 + // Total Amount
                           PDF_CONFIG.SPACING.SECTION + 
                           30; // Extra buffer
        
        // Check if we need a new page for the entire total section
        if (this.currentY + spaceNeeded > this.pageHeight - this.bottomMargin - 20) {
            this.addNewPage();
        }
        
        // Add summary section title with consistent formatting
        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Cost Summary', this.leftMargin, this.currentY);
        this.currentY += PDF_CONFIG.SPACING.TITLE_GAP;
        
        const rightAlign = this.pageWidth - this.rightMargin;
        
        // Room-wise summary header
        this.doc.setFontSize(10);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Room-wise Totals:', this.leftMargin, this.currentY);
        this.currentY += PDF_CONFIG.SPACING.PARAGRAPH;
        
        // Room totals with consistent formatting
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(9);
        Object.keys(roomTotals).forEach(roomName => {
            // Indent room names consistently
            this.doc.text(`${roomName}:`, this.leftMargin + 8, this.currentY);
            
            // Right align the amounts with proper currency symbol
            this.doc.text(`Rs. ${Math.round(roomTotals[roomName]).toLocaleString()}`, rightAlign, this.currentY, { align: 'right' });
            
            // Use consistent line spacing
            this.currentY += PDF_CONFIG.SPACING.LINE;
        });
        
        // Add space between sections
        this.currentY += PDF_CONFIG.SPACING.PARAGRAPH;
        
        // Show subtotal and GST only if they exist in quoteData
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(12);
        
        // Total summary alignment
        const labelX = rightAlign - 80; // Consistent position for labels
        
        if (quoteData.subtotal && quoteData.gst) {
            // Subtotal
            this.doc.text('Subtotal:', labelX, this.currentY);
            this.doc.text(`Rs. ${Math.round(quoteData.subtotal).toLocaleString()}`, rightAlign, this.currentY, { align: 'right' });
            this.currentY += PDF_CONFIG.SPACING.PARAGRAPH;
            
            // GST
            this.doc.text('GST (18%):', labelX, this.currentY);
            this.doc.text(`Rs. ${Math.round(quoteData.gst).toLocaleString()}`, rightAlign, this.currentY, { align: 'right' });
            this.currentY += PDF_CONFIG.SPACING.PARAGRAPH;
        }
        
        // Line with consistent positioning
        this.doc.setDrawColor(0, 0, 0);
        this.doc.line(labelX, this.currentY, rightAlign, this.currentY);
        this.currentY += PDF_CONFIG.SPACING.PARAGRAPH;
        
        // Total Amount with enhanced visibility
        this.doc.setFontSize(14);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(PDF_CONFIG.BRAND_COLOR[0], PDF_CONFIG.BRAND_COLOR[1], PDF_CONFIG.BRAND_COLOR[2]);
        this.doc.text('Total Amount', labelX, this.currentY);
        this.doc.text(`Rs. ${Math.round(quoteData.total).toLocaleString()}`, rightAlign, this.currentY, { align: 'right' });
        
        // Reset text color
        this.doc.setTextColor(0, 0, 0);
        this.currentY += PDF_CONFIG.SPACING.SECTION; // Consistent spacing after total
    }
    
    calculateRoomTotals(items) {
        const totals = {};
        items.forEach(item => {
            if (!totals[item.room]) {
                totals[item.room] = 0;
            }
            totals[item.room] += item.cost;
        });
        return totals;
    }

    addFooter() {
        // Terms and conditions
        this.doc.setFontSize(9);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('Terms & Conditions:', this.leftMargin, this.currentY);
        this.currentY += PDF_CONFIG.SPACING.PARAGRAPH;
        
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(8);
        
        // Apply terms and conditions from config
        const formattedTerms = PDF_CONFIG.TERMS_CONDITIONS.map(term => `• ${term}`);
        
        formattedTerms.forEach(term => {
            // Check if we need a new page - ensure proper bottom margin
            if (this.currentY + PDF_CONFIG.SPACING.LINE > this.pageHeight - this.bottomMargin - 20) {
                this.addNewPage();
            }
            this.doc.text(term, this.leftMargin, this.currentY);
            this.currentY += PDF_CONFIG.SPACING.LINE;
        });
        
        // Footer - position from bottom with consistent margin
        const footerY = this.pageHeight - this.bottomMargin - 10;
        this.doc.setFontSize(8);
        this.doc.setTextColor(128, 128, 128);
        this.doc.text(PDF_CONFIG.FOOTER_TEXT, 
                     this.pageWidth / 2, footerY, { align: 'center' });
        
        // Web links for app and website
        this.doc.setTextColor(PDF_CONFIG.BRAND_COLOR[0], PDF_CONFIG.BRAND_COLOR[1], PDF_CONFIG.BRAND_COLOR[2]);
        
        // Add website link with annotation (left aligned)
        this.doc.textWithLink(`${PDF_CONFIG.COMPANY_WEBSITE}`, 
                            this.leftMargin, footerY + 6, 
                            { url: PDF_CONFIG.COMPANY_WEBSITE_URL });
        
        // Add app link with annotation (right aligned)
        this.doc.textWithLink('What App us', 
                            this.pageWidth - this.rightMargin, footerY + 6, 
                            { url: PDF_CONFIG.WhatApp_URL, align: 'right' });
                            
        // Add page number
        this.addPageNumber();
    }
    
    addPageNumber() {
        // Get current page and total pages
        const currentPage = this.doc.getCurrentPageInfo().pageNumber;
        const totalPages = this.doc.getNumberOfPages();
        
        // Add page number at the bottom center of each page with consistent bottom margin
        const pageNumberY = this.pageHeight - (this.bottomMargin / 2); // Position halfway into bottom margin
        this.doc.setFontSize(8);
        this.doc.setTextColor(100, 100, 100);
        this.doc.text(`${currentPage} of ${totalPages}`, 
                     this.pageWidth / 2, pageNumberY, 
                     { align: 'center' });
    }

    addNewPage() {
        // Add page number to the current page before adding a new one
        this.addPageNumber();
        
        // Add a new page
        this.doc.addPage();
        
        // Start at the top margin
        this.currentY = this.topMargin;
        
        // Add header to new page for consistency
        this.doc.setFontSize(14);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(PDF_CONFIG.BRAND_COLOR[0], PDF_CONFIG.BRAND_COLOR[1], PDF_CONFIG.BRAND_COLOR[2]);
        this.doc.text(PDF_CONFIG.PDF_TITLE, this.pageWidth / 2, this.currentY, { align: 'center' });
        
        // Add horizontal line with consistent margins
        this.currentY += PDF_CONFIG.SPACING.LINE;
        this.doc.setDrawColor(200, 200, 200);
        this.doc.line(this.leftMargin, this.currentY, this.pageWidth - this.rightMargin, this.currentY);
        
        // Position content below the header with proper spacing
        this.currentY += PDF_CONFIG.SPACING.SECTION;

        // Reset font, font size and text color to match page 1 defaults so subsequent content
        // keeps consistent formatting (prevents larger font size leaking from header)
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(8);
        this.doc.setTextColor(0, 0, 0);
    }

    // Helper method to load images (if needed)
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }
}

// Simple fallback PDF generation
function generateSimplePDF(quoteData) {
    try {
        // Try to get jsPDF from different possible locations
        let jsPDFLib;
        if (typeof window.jsPDF !== 'undefined') {
            jsPDFLib = window.jsPDF;
        } else if (typeof window.jspdf?.jsPDF !== 'undefined') {
            jsPDFLib = window.jspdf.jsPDF;
        } else if (typeof jsPDF !== 'undefined') {
            jsPDFLib = jsPDF;
        } else {
            throw new Error('jsPDF not available');
        }
        
        const doc = new jsPDFLib();
        
        // Simple PDF content
        doc.setFontSize(20);
        doc.text('Interior Design Quotation', 20, 20);
        
        doc.setFontSize(12);
        doc.text(`Total Amount: Rs. ${Math.round(quoteData.total).toLocaleString()}`, 20, 40);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 50);
        
        // Add items
        let y = 70;
        doc.text('Items:', 20, y);
        y += 10;
        
        quoteData.items.forEach(item => {
            doc.text(`${item.room}: ${item.type} - Rs. ${Math.round(item.cost).toLocaleString()}`, 20, y);
            y += 8;
        });
        
        doc.save('Interior_Quote.pdf');
        
    } catch (error) {
        console.error('Fallback PDF generation failed:', error);
        alert('PDF generation failed. Please try again or contact support.');
    }
}

/**
 * Global function to generate detailed PDF quote
 * This is the main entry point for PDF generation from the UI
 */
function generateDetailedPDF() {
    console.log('PDF generation started...');
    
    // Test if jsPDF is available
    console.log('jsPDF test:', typeof window.jsPDF, typeof window.jspdf, typeof jsPDF);
    
    // Get calculator instance - try different possible locations
    const calc = window.calculator || (typeof calculator !== 'undefined' ? calculator : null);
    
    // Validate calculator instance
    if (!calc) {
        console.error('Calculator not found in window.calculator or global calculator');
        alert('Calculator not initialized. Please refresh the page and try again.');
        return;
    }
    
    // Get quote data from calculator
    console.log('Getting quote data...');
    const quoteData = calc.getQuoteData();
    
    // Validate quote data
    if (!quoteData || !quoteData.items || quoteData.items.length === 0) {
        console.warn('No items selected for quote');
        alert('Please select some items before generating PDF.');
        return;
    }
    
    // Generate PDF with error handling
    try {
        // Create new instance for this generation
        const pdfGenerator = new PDFGenerator();
        pdfGenerator.generateQuotePDF(quoteData);
        console.log('PDF generation completed successfully');
    } catch (error) {
        console.error('Main PDF generation failed:', error);
        alert('An error occurred while generating the PDF. Trying simplified version...');
        
        // Try fallback method with simplified PDF
        try {
            generateSimplePDF(quoteData);
        } catch (fallbackError) {
            console.error('Fallback PDF generation also failed:', fallbackError);
            alert('PDF generation failed. Please check your browser console for details.');
        }
    }
}

// Test function to check if jsPDF is working
function testJsPDF() {
    console.log('Testing jsPDF...');
    try {
        let jsPDFLib;
        if (typeof window.jsPDF !== 'undefined') {
            jsPDFLib = window.jsPDF;
        } else if (typeof window.jspdf?.jsPDF !== 'undefined') {
            jsPDFLib = window.jspdf.jsPDF;
        } else if (typeof jsPDF !== 'undefined') {
            jsPDFLib = jsPDF;
        }
        
        if (jsPDFLib) {
            const testDoc = new jsPDFLib();
            testDoc.text('Test', 10, 10);
            console.log('jsPDF test successful');
            return true;
        } else {
            console.error('jsPDF not found');
            return false;
        }
    } catch (error) {
        console.error('jsPDF test failed:', error);
        return false;
    }
}

/**
 * Initialize PDF generator when DOM is loaded
 * Creates a global instance and tests jsPDF availability
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing PDF generator...');
    window.pdfGenerator = new PDFGenerator();
    
    // Test jsPDF after a short delay to ensure libraries are loaded
    setTimeout(() => {
        const isWorking = testJsPDF();
        console.log('jsPDF working:', isWorking);
        
        if (!isWorking) {
            console.warn('jsPDF may not be properly loaded. PDF generation might fail.');
        }
    }, 500);
});