# Interior Design Cost Calculator

A professional web application for generating interior design cost estimates and quotations.

## Project Structure

```
Kreative Solution - Interior Quote/
│
├── index.html              # Main HTML file - Entry point of application
├── note.note              # Project notes and requirements
│
├── css/
│   └── styles.css         # Main stylesheet with responsive design
│
├── js/
│   ├── pricing.js         # Backend pricing configuration and data
│   ├── calculator.js      # Main application logic and calculations
│   └── pdf-generator.js   # PDF export functionality
│
├── images/
│   └── furniture/         # Furniture images for display in UI and PDFs
│       ├── cupboard.jpg   # (Add furniture images here)
│       ├── bed.jpg
│       ├── wardrobe.jpg
│       ├── sideTable.jpg
│       ├── dressingTable.jpg
│       └── studyTable.jpg
│
├── assets/
│   └── logo.png          # Company logo (optional)
│
└── README.md             # This documentation file
```

## File Purpose and Functions

### Core Files

#### `index.html`
- **Purpose**: Main HTML structure and user interface
- **Features**:
  - Responsive design for mobile and desktop
  - Step-by-step form wizard
  - Property type selection (1BHK, 2BHK, etc.)
  - Room configuration
  - Furniture selection with images
  - Real-time cost calculation display
  - Quote generation and PDF download buttons

#### `css/styles.css`
- **Purpose**: Complete styling and responsive design
- **Features**:
  - Modern gradient design
  - Mobile-first responsive layout
  - Smooth transitions and animations
  - Print-friendly styles
  - Accessibility features
  - Loading states and visual feedback

### JavaScript Files

#### `js/pricing.js`
- **Purpose**: Backend pricing configuration and business logic
- **Contains**:
  - Furniture pricing by size (cupboard, bed, wardrobe)
  - Fixed price items (side table, dressing table, study table)
  - Kitchen pricing per running foot (basic, modular, premium)
  - Tax configuration (GST, labor tax)
  - Discount structure for bulk orders
  - Service pricing (installation, delivery, design consultation)

#### `js/calculator.js`
- **Purpose**: Main application functionality and user interactions
- **Features**:
  - Property type handling and auto-configuration
  - Dynamic bedroom and kitchen section generation
  - Real-time cost calculations
  - Furniture selection with size options
  - Room-wise cost breakdown
  - Quote generation with detailed itemization
  - Image integration for furniture items
  - Event handling for all user interactions

#### `js/pdf-generator.js`
- **Purpose**: Professional PDF quote generation
- **Features**:
  - Company branding and header
  - Detailed itemized quotation
  - Tax calculations and total breakdown
  - Terms and conditions
  - Professional formatting
  - Automatic page breaks
  - Date and quote ID generation

### Asset Directories

#### `images/furniture/`
- **Purpose**: Store furniture images for UI and PDF display
- **Required Images**:
  - `cupboard.jpg` - Cupboard/cabinet images
  - `bed.jpg` - Bed designs
  - `wardrobe.jpg` - Wardrobe designs
  - `sideTable.jpg` - Side table designs
  - `dressingTable.jpg` - Dressing table designs
  - `studyTable.jpg` - Study table designs

#### `assets/`
- **Purpose**: Store company assets
- **Files**:
  - `logo.png` - Company logo for branding
  - Other brand assets as needed

## Features

### Current Features
1. **Multi-step Form Wizard**: Guided user experience
2. **Property Type Selection**: Pre-configured options for different apartment sizes
3. **Dynamic Room Configuration**: Flexible bedroom and kitchen setup
4. **Furniture Selection**: Complete furniture catalog with sizes and pricing
5. **Real-time Calculations**: Instant cost updates as user makes selections
6. **Professional PDF Generation**: Downloadable quotations with branding
7. **Responsive Design**: Works on all device sizes
8. **Tax Calculations**: Automatic GST and other tax computations

### Planned Enhancements
1. **Image Integration**: Furniture images in UI and PDFs
2. **Advanced Pricing Logic**: Bulk discounts, seasonal offers
3. **Customer Information**: Contact details and project specifics
4. **Email Integration**: Direct quote sharing via email
5. **Database Integration**: Save quotes and customer data
6. **Multiple Currency Support**: International pricing options

## Setup Instructions

1. **File Structure**: Ensure all files are in their correct directories
2. **Images**: Add furniture images to the `images/furniture/` directory
3. **Branding**: Replace company information in PDF generator
4. **Pricing**: Update pricing in `js/pricing.js` as needed
5. **Testing**: Open `index.html` in a web browser

## Dependencies

### External Libraries
- **jsPDF**: For PDF generation (loaded via CDN)

### Browser Support
- Modern browsers with ES6 support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Customization

### Pricing Updates
Edit `js/pricing.js` to modify:
- Furniture prices
- Kitchen rates
- Tax percentages
- Service charges
- Discount structures

### Styling Changes
Edit `css/styles.css` to modify:
- Color scheme
- Layout and spacing
- Typography
- Responsive breakpoints

### Business Logic
Edit `js/calculator.js` to modify:
- Calculation methods
- Form behavior
- Validation rules
- User interactions

### PDF Layout
Edit `js/pdf-generator.js` to modify:
- PDF formatting
- Company branding
- Terms and conditions
- Layout structure

## Future Development

### Phase 1: Enhanced UI
- Add furniture image display
- Improve mobile experience
- Add loading animations

### Phase 2: Advanced Features
- Customer information capture
- Email quote delivery
- Quote history and management

### Phase 3: Business Features
- Multi-language support
- Advanced reporting
- Integration with CRM systems
- Payment gateway integration

## Support

For technical support or feature requests, contact the development team.

---

*Last Updated: October 2025*