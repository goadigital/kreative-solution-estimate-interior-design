/**
 * ====================================================================
 * PRICING CONFIGURATION - EASY EDIT SECTION
 * ====================================================================
 * 
 * INSTRUCTIONS FOR EDITING:
 * 
 * 1. TO CHANGE PRICES: Edit the numbers in "furniturePricing" section
 * 2. TO CHANGE LABELS: Edit the text in "furnitureLabels" section
 * 3. TO ADD NEW FURNITURE: Add to both pricing and labels sections
 * 4. TO CHANGE KITCHEN PRICING: Edit "kitchenConfig" section
 * 
 * Changes here will automatically update throughout the entire app!
 * ====================================================================
 */

// ===== FURNITURE PRICING (in INR) =====
// Change the prices here to update throughout the app
const furniturePricing = {
    cupboard: { 
        twoDoor: 51267,     // 2-Door Cupboard
        threeDoor: 85445,   // 3-Door Cupboard
        fourDoor: 102534     // 4-Door Cupboard
    },
    bed: { 
        single: 45000,      // Single Bed
        queen: 50000,       // Queen Size Bed
        king: 55000         // King Size Bed
    },
    wardrobe: { 
        twoDoor: 51267,     // 2-Door Wardrobe
        threeDoor: 85445,   // 3-Door Wardrobe
        fourDoor: 102534    // 4-Door Wardrobe
    },
    sideTable: {
        small: 4883,        // Small Side Table
        medium: 6646,       // Medium Side Table
        large: 8951         // Large Side Table
    },
    dressingTable: {
        withoutMirror: 18310,   // Dressing Table without Mirror
        withMirror: 32859,      // Dressing Table with Mirror
        premium: 40816          // Premium Dressing Table with Mirror & Storage
    },
    studyTable: {
        basic: 21000,       // Basic Study Table
        withDrawers: 28000, // Study Table with Drawers
        lShape: 35000       // L-Shape Study Table with Storage
    },
    tvUnit: {
        small: 12369,       // Small TV Unit (up to 43")
        medium: 15461,      // Medium TV Unit (up to 55")
        large: 18554        // Large TV Unit (up to 65"+)
    },
    sofa: {
        twoSeater: 30000,   // 2-Seater Sofa
        threeSeater: 45000, // 3-Seater Sofa
        lShape: 65000       // L-Shape Sofa
    },
    table: {
        coffee: 15000,      // Coffee Table
        dining4: 35000,     // Dining Table (4-Seater)
        dining6: 50000      // Dining Table (6-Seater)
    }
};

// ===== FURNITURE LABELS & DESCRIPTIONS =====
// Change the labels here to update what users see on the website
const furnitureLabels = {
    cupboard: { 
        twoDoor: '2-Door Cupboard (H:210cm, W:90cm, D:60cm)', 
        threeDoor: '3-Door Cupboard (H:210cm, W:150cm, D:60cm)', 
        fourDoor: '4-Door Cupboard (H:210cm, W:180cm, D:60cm)' 
    },
    bed: { 
        single: 'Single Bed (3x6 feet)', 
        queen: 'Queen Bed (5x6.5 feet)', 
        king: 'King Bed (6x6.5 feet)' 
    },
    wardrobe: { 
        twoDoor: '2-Door Wardrobe (H:210cm, W:90cm, D:60cm)', 
        threeDoor: '3-Door Wardrobe (H:210cm, W:150cm, D:60cm)', 
        fourDoor: '4-Door Wardrobe (H:210cm, W:180cm, D:60cm)' 
    },
    sideTable: {
        small: 'Small Side Table (H:45cm, W:40cm, D:30cm)',
        medium: 'Medium Side Table (H:49cm, W:50cm, D:35cm)',
        large: 'Large Side Table (H:55cm, W:60cm, D:40cm)'
    },
    dressingTable: {
        withoutMirror: 'Dressing Table without Mirror (H:75cm, W:90cm, D:45cm)',
        withMirror: 'Dressing Table with Mirror (H:78cm, W:100cm, D:48cm)',
        premium: 'Premium Dressing Table with Mirror & Storage (H:85cm, W:120cm, D:50cm)'
    },
    studyTable: {
        basic: 'Basic Study Table (H:75cm, W:100cm, D:50cm)',
        withDrawers: 'Study Table with Drawers (H:75cm, W:120cm, D:60cm)',
        lShape: 'L-Shape Study Table with Storage (H:75cm, W:150cm, D:70cm)'
    },
    tvUnit: {
        small: 'Small TV Unit for up to 43" TV (H:38cm, W:120cm, D:42cm)',
        medium: 'Medium TV Unit for up to 55" TV (H:38cm, W:150cm, D:42cm)',
        large: 'Large TV Unit for up to 65"+ TV (H:38cm, W:180cm, D:42cm)'
    },
    sofa: {
        twoSeater: '2-Seater Sofa',
        threeSeater: '3-Seater Sofa',
        lShape: 'L-Shape Sofa'
    },
    table: {
        coffee: 'Coffee Table',
        dining4: 'Dining Table 4-Seater',
        dining6: 'Dining Table 6-Seater'
    }
};

// ===== KITCHEN PRICING CONFIGURATION =====
// Edit kitchen prices, types, and size options here
const kitchenConfig = {
    // Predefined kitchen sizes
    standardSizes: {
        200: {
            length: 200,
            height: 80,
            label: "Kitchen Length 200 Cm, Height 80 Cm"
        },
        250: {
            length: 250,
            height: 80,
            label: "Kitchen Length 250 Cm, Height 80 Cm"
        }
        // Add more standard sizes here as needed
    },
    
    // Kitchen types with pricing per square meter
    types: {
        modular: {
            pricePerSqMeter: 33153,
            label: "Modular Kitchen", 
            description: "Enhanced modular kitchen with premium fittings"
        },
        premium: {
            pricePerSqMeter: 40688,
            label: "Modular Kitchen Premium",
            description: "Luxury kitchen with high-end materials and accessories"
        }
        // Add more kitchen types here as needed
    },
    
    // Custom kitchen limits
    custom: {
        minLength: 100,         // Minimum length in cm
        maxLength: 500,         // Maximum length in cm
        standardHeight: 80,     // Standard height in cm
        lengthStep: 1           // Length increment step
    }
};

// ===== COMBINED PRICING OBJECT (DO NOT EDIT BELOW THIS LINE) =====
const pricing = {
    // Combine furniture pricing
    ...furniturePricing,
    
    // Kitchen configuration with methods
    kitchen: {
        ...kitchenConfig,
        
        // Kitchen calculation method
        calculateCost: function(length, kitchenType) {
            const typeConfig = this.types[kitchenType];
            if (!typeConfig) {
                console.error('Invalid kitchen type:', kitchenType);
                return 0;
            }
            
            if (!length || length < this.custom.minLength) {
                console.error('Invalid kitchen length:', length);
                return 0;
            }
            
            // Calculate area: length (cm) × height (cm) = area in square cm
            // Convert to square meters: area in sq cm ÷ 10000 = area in sq meters
            const heightCm = this.custom.standardHeight;
            const areaSqCm = length * heightCm;
            const areaSqMeter = areaSqCm / 10000; // Convert sq cm to sq meter
            
            return areaSqMeter * typeConfig.pricePerSqMeter;
        },
        
        // Get kitchen type options for dropdown
        getTypeOptions: function() {
            return Object.keys(this.types).map(key => ({
                value: key,
                label: this.types[key].label,
                pricePerSqMeter: this.types[key].pricePerSqMeter,
                description: this.types[key].description
            }));
        },
        
        // Get standard size options for dropdown
        getSizeOptions: function() {
            return Object.keys(this.standardSizes).map(key => ({
                value: key,
                label: this.standardSizes[key].label,
                length: this.standardSizes[key].length,
                height: this.standardSizes[key].height
            }));
        },
        
        // Validate custom length
        isValidLength: function(length) {
            return length >= this.custom.minLength && 
                   length <= this.custom.maxLength && 
                   length % this.custom.lengthStep === 0;
        }
    }
};

/**
 * ====================================================================
 * CALCULATOR IMPLEMENTATION - DO NOT EDIT UNLESS YOU KNOW WHAT YOU'RE DOING
 * ====================================================================
 */

class InteriorCalculator {
    constructor() {
        this.totalCost = 0;
        this.selectedItems = [];
        
        // Load pricing configuration
        this.pricing = pricing; // Use the pricing object defined above
        console.log('Pricing loaded from local pricing object');
        
        this.init();
    }

    init() {
        console.log('Interior Calculator initialized');
        console.log('Pricing config loaded:', !!this.pricing);
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Property type change handler
        const propertyTypeSelect = document.getElementById('propertyType');
        if (propertyTypeSelect) {
            propertyTypeSelect.addEventListener('change', () => this.handlePropertyChange());
        }

        // Number of bedrooms change handler
        const numBedroomsSelect = document.getElementById('numBedrooms');
        if (numBedroomsSelect) {
            numBedroomsSelect.addEventListener('change', () => this.generateBedroomSections());
        }

        // Number of kitchens change handler
        const numKitchensSelect = document.getElementById('numKitchens');
        if (numKitchensSelect) {
            numKitchensSelect.addEventListener('change', () => this.generateKitchenSections());
        }

        // Add click listeners on container to capture selection and animate transitions
        document.addEventListener('click', (e) => this.handleGlobalClick(e));

        // Floating total scroll behaviour
        window.addEventListener('scroll', () => this.updateFloatingTotalVisibility());
    }

    handleGlobalClick(e) {
        // When a checkbox or select inside a section is changed, reveal the next section smoothly
        const target = e.target;
        if (!target) return;

        // If a checkbox was clicked, animate reveal of the next visible section
        if (target.matches('input[type="checkbox"], select')) {
            // small debounce
            setTimeout(() => {
                this.revealNextSection(target);
                this.updateFloatingTotal();
            }, 80);
        }
    }

    revealNextSection(target) {
        // Find the containing section node
        const section = target.closest('.section');
        if (!section) return;

        // Handle property type selection differently
        if (section.id === 'step1') {
            const propertyType = document.getElementById('propertyType').value;
            if (propertyType && !['individual', 'custom'].includes(propertyType)) {
                // For apartments, reveal step3 directly
                const step3 = document.getElementById('step3');
                if (step3 && step3.classList.contains('hidden')) {
                    step3.classList.remove('hidden');
                    step3.classList.add('animate-in');
                    setTimeout(() => step3.classList.remove('animate-in'), 500);
                    step3.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                return;
            }
        }

        // For other cases, find next sibling .section that is hidden
        let next = section.nextElementSibling;
        while (next && !next.classList.contains('section')) {
            next = next.nextElementSibling;
        }

        if (next && next.classList.contains('hidden')) {
            next.classList.remove('hidden');
            // Only animate if it's not property type selection or room configuration
            if (section.id !== 'step1' && next.id !== 'step2') {
                next.classList.add('animate-in');
                // remove animation class after finish to allow replay
                setTimeout(() => next.classList.remove('animate-in'), 500);
            }
            // Scroll to the newly revealed section smoothly
            next.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Update the floating total element with the latest total
    updateFloatingTotal() {
        const floatEl = document.getElementById('floatingTotalAmount');
        if (!floatEl) return;
        floatEl.textContent = Math.round(this.totalCost).toLocaleString();
        // show floating briefly
        const wrapper = document.getElementById('floatingTotal');
        if (wrapper) {
            wrapper.classList.add('visible');
            // make it slightly smaller for unobtrusive presence
            wrapper.classList.add('small');
            clearTimeout(wrapper._hideTimeout);
            wrapper._hideTimeout = setTimeout(() => {
                wrapper.classList.remove('small');
            }, 1800);
        }
    }

    updateFloatingTotalVisibility() {
        const wrapper = document.getElementById('floatingTotal');
        if (!wrapper) return;
        // Show when user scrolls down more than 120px, hide near bottom (to not overlap sticky total)
        const showAt = 120;
        const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200);
        if (window.scrollY > showAt && !nearBottom) {
            wrapper.classList.add('visible');
        } else {
            wrapper.classList.remove('visible');
        }
    }

    handlePropertyChange() {
        console.log('handlePropertyChange triggered');
        const propertyType = document.getElementById('propertyType').value;
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');
        const step4 = document.getElementById('step4');
        
        if (propertyType) {
            const numBedrooms = document.getElementById('numBedrooms');
            const numKitchens = document.getElementById('numKitchens');
            const step3Title = document.getElementById('step3Title');
            const step4Title = document.getElementById('step4Title');
            const step5Title = document.getElementById('step5Title');
            
            // Check if property type requires Step 2 or can skip directly to Step 3
            if (propertyType === 'individual' || propertyType === 'custom') {
                // Show Step 2 for Individual House and Custom Configuration
                step2.classList.remove('hidden');
                step3.classList.add('hidden');
                step4.classList.add('hidden');
                
                // Keep original step numbering
                step3Title.textContent = 'Step 3: Bedroom Furniture Selection';
                step4Title.textContent = 'Step 4: Living Room Selection';
                step5Title.textContent = 'Step 5: Kitchen Details';
                
                // Set default values for individual house
                if (propertyType === 'individual') {
                    numBedrooms.value = '3'; // Default for individual house
                    numKitchens.value = '1';
                }
            } else {
                // Skip Step 2 and show Step 3 directly for apartment types (1BHK, 2BHK, 3BHK, 4BHK)
                step2.classList.add('hidden');
                step3.classList.remove('hidden');
                step4.classList.remove('hidden');
                
                // Update step numbering (Step 3 becomes Step 2, Step 4 becomes Step 3, Step 5 becomes Step 4)
                step3Title.textContent = 'Step 2: Bedroom Furniture Selection';
                step4Title.textContent = 'Step 3: Living Room Selection';
                step5Title.textContent = 'Step 4: Kitchen Details';
                
                // Auto-configure based on apartment type
                switch(propertyType) {
                    case '1bhk':
                        numBedrooms.value = '1';
                        break;
                    case '2bhk':
                        numBedrooms.value = '2';
                        break;
                    case '3bhk':
                        numBedrooms.value = '3';
                        break;
                    case '4bhk':
                        numBedrooms.value = '4';
                        break;
                }
                
                // All apartments have 1 kitchen
                numKitchens.value = '1';
                
                // Directly show Step 3, 4 and 5
                this.generateBedroomSections();
                this.generateLivingRoomSections();
                this.generateKitchenSections();
            }
        } else {
            // Hide all subsequent sections when property type is deselected
            step2.classList.add('hidden');
            step3.classList.add('hidden');
            step4.classList.add('hidden');
            document.getElementById('step5').classList.add('hidden');
            
            // Clear containers
            const bedroomContainer = document.getElementById('bedroomContainer');
            const livingRoomContainer = document.getElementById('livingRoomContainer');
            const kitchenContainer = document.getElementById('kitchenContainer');
            if (bedroomContainer) bedroomContainer.innerHTML = '';
            if (livingRoomContainer) livingRoomContainer.innerHTML = '';
            if (kitchenContainer) kitchenContainer.innerHTML = '';
            
            // Reset total cost
            this.totalCost = 0;
            this.selectedItems = [];
            this.updateTotalDisplay();
        }
    }

    generateBedroomSections() {
        const numBedrooms = parseInt(document.getElementById('numBedrooms').value);
        const container = document.getElementById('bedroomContainer');
        const step3 = document.getElementById('step3');
        
        container.innerHTML = '';
        step3.classList.remove('hidden');
        
        for (let i = 1; i <= numBedrooms; i++) {
            const bedroomDiv = document.createElement('div');
            bedroomDiv.className = 'room-section';
            bedroomDiv.innerHTML = this.generateBedroomHTML(i);
            container.appendChild(bedroomDiv);
        }
        
        this.generateLivingRoomSections();
    }

    generateBedroomHTML(roomNumber) {
        return `
            <div class="room-title">Bedroom ${roomNumber}</div>
            
            ${this.generateFurnitureItemHTML('cupboard', roomNumber, 'Cupboard', true)}
            ${this.generateFurnitureItemHTML('bed', roomNumber, 'Bed', true)}
            ${this.generateFurnitureItemHTML('sideTable', roomNumber, 'Side Table', true)}
            ${this.generateFurnitureItemHTML('dressingTable', roomNumber, 'Dressing Table', true)}
            ${this.generateFurnitureItemHTML('studyTable', roomNumber, 'Study Table', true)}
            ${this.generateFurnitureItemHTML('wardrobe', roomNumber, 'Wardrobe', true)}
        `;
    }

    generateFurnitureItemHTML(itemType, roomNumber, displayName, hasSizes) {
        const itemId = `${itemType}_${roomNumber}`;
        const sizeId = `${itemType}Size_${roomNumber}`;
        
        let furnitureImageHTML = '';
        const imagePath = `images/furniture/${itemType}.jpg`;
        furnitureImageHTML = `<img src="${imagePath}" alt="${displayName}" class="furniture-image" onerror="this.style.display='none'">`;

        let sizeOptionsHTML = '';
        if (hasSizes) {
            let sizeOptions = '';
            const sizeConfig = this.pricing[itemType];
            
            if (sizeConfig && typeof sizeConfig === 'object') {
                sizeOptions = Object.keys(sizeConfig).map(size => {
                    const sizeLabel = this.getSizeLabel(itemType, size);
                    return `<option value="${size}">${sizeLabel}</option>`;
                }).join('');
            }

            sizeOptionsHTML = `
                <div class="size-options hidden" id="${sizeId}">
                    <select onchange="calculator.calculateTotal()">
                        <option value="">Select Size</option>
                        ${sizeOptions}
                    </select>
                </div>
            `;
        }

        return `
            <div class="furniture-item">
                <div class="furniture-header">
                    ${furnitureImageHTML}
                    <span class="furniture-name">${displayName}</span>
                    <div class="checkbox-group">
                        <input type="checkbox" id="${itemId}" onchange="calculator.toggleSizeOptions('${itemId}', '${sizeId}')">
                        <label for="${itemId}">Include</label>
                    </div>
                </div>
                ${sizeOptionsHTML}
            </div>
        `;
    }

    getSizeLabel(itemType, size) {
        // For items with size variants (cupboard, bed, wardrobe)
        if (furnitureLabels[itemType] && typeof furnitureLabels[itemType] === 'object') {
            return furnitureLabels[itemType][size] || size.charAt(0).toUpperCase() + size.slice(1);
        }
        // For fixed-price items (sideTable, dressingTable, studyTable)
        else if (furnitureLabels[itemType] && typeof furnitureLabels[itemType] === 'string') {
            return furnitureLabels[itemType];
        }
        // Fallback
        return size.charAt(0).toUpperCase() + size.slice(1);
    }

    generateKitchenSections() {
        const numKitchens = parseInt(document.getElementById('numKitchens').value);
        const container = document.getElementById('kitchenContainer');
        
        container.innerHTML = '';
        
        for (let i = 1; i <= numKitchens; i++) {
            const kitchenDiv = document.createElement('div');
            kitchenDiv.className = 'room-section';
            // Generate kitchen size options from pricing config
            const sizeOptions = this.pricing.kitchen.getSizeOptions();
            const sizeOptionsHTML = sizeOptions.map(option => 
                `<option value="${option.value}">${option.label}</option>`
            ).join('');
            
            // Generate kitchen type options from pricing config
            const typeOptions = this.pricing.kitchen.getTypeOptions();
            const typeOptionsHTML = typeOptions.map(option => 
                `<option value="${option.value}">${option.label}</option>`
            ).join('');
            
            kitchenDiv.innerHTML = `
                <div class="room-title">Kitchen ${i}</div>
                <div class="form-group">
                    <label for="kitchenLengthOption_${i}">Kitchen Dimensions</label>
                    <select id="kitchenLengthOption_${i}" onchange="calculator.handleKitchenLengthChange(${i})">
                        <option value="">-- Select Kitchen Size --</option>
                        ${sizeOptionsHTML}
                        <option value="custom">Custom Length</option>
                    </select>
                </div>
                <div class="form-group hidden" id="customKitchenLength_${i}">
                    <label for="kitchenLength_${i}">Kitchen Length (in Cm)</label>
                    <input type="number" id="kitchenLength_${i}" 
                           min="${this.pricing.kitchen.custom.minLength}" 
                           max="${this.pricing.kitchen.custom.maxLength}" 
                           step="${this.pricing.kitchen.custom.lengthStep}" 
                           placeholder="Enter custom length in cm" 
                           onchange="calculator.calculateTotal()">
                    <small style="color: #666; font-size: 12px;">Height: ${this.pricing.kitchen.custom.standardHeight} Cm (Standard)</small>
                    <small style="color: #666; font-size: 12px;">Range: ${this.pricing.kitchen.custom.minLength}-${this.pricing.kitchen.custom.maxLength} cm</small>
                </div>
                <div class="form-group">
                    <label for="kitchenType_${i}">Kitchen Type</label>
                    <select id="kitchenType_${i}" onchange="calculator.calculateTotal()">
                        ${typeOptionsHTML}
                    </select>
                </div>
            `;
            container.appendChild(kitchenDiv);
        }
    }

    generateLivingRoomSections() {
        const container = document.getElementById('livingRoomContainer');
        const step4 = document.getElementById('step4');
        
        container.innerHTML = '';
        step4.classList.remove('hidden');
        
        const livingRoomDiv = document.createElement('div');
        livingRoomDiv.className = 'room-section';
        livingRoomDiv.innerHTML = this.generateLivingRoomHTML();
        container.appendChild(livingRoomDiv);
        
        document.getElementById('step5').classList.remove('hidden');
    }

    generateLivingRoomHTML() {
        return `
            <div class="room-title">Living Room</div>
            
            ${this.generateFurnitureItemHTML('tvUnit', 'living', 'TV Unit', true)}
            ${this.generateFurnitureItemHTML('sofa', 'living', 'Sofa', true)}
            ${this.generateFurnitureItemHTML('table', 'living', 'Table', true)}
        `;
    }

    handleKitchenLengthChange(kitchenNumber) {
        const lengthOptionSelect = document.getElementById(`kitchenLengthOption_${kitchenNumber}`);
        const customLengthGroup = document.getElementById(`customKitchenLength_${kitchenNumber}`);
        const lengthInput = document.getElementById(`kitchenLength_${kitchenNumber}`);
        
        const selectedValue = lengthOptionSelect.value;
        
        if (selectedValue === 'custom') {
            // Show custom input field
            customLengthGroup.classList.remove('hidden');
            lengthInput.value = '';
        } else if (selectedValue && this.pricing.kitchen.standardSizes[selectedValue]) {
            // Hide custom input and set predefined value from pricing config
            customLengthGroup.classList.add('hidden');
            lengthInput.value = this.pricing.kitchen.standardSizes[selectedValue].length;
            this.calculateTotal();
        } else {
            // Hide custom input and clear value
            customLengthGroup.classList.add('hidden');
            lengthInput.value = '';
            this.calculateTotal();
        }
    }

    toggleSizeOptions(checkboxId, sizeOptionsId) {
        const checkbox = document.getElementById(checkboxId);
        const sizeOptions = document.getElementById(sizeOptionsId);
        
        if (checkbox && sizeOptions) {
            if (checkbox.checked) {
                sizeOptions.classList.remove('hidden');
            } else {
                sizeOptions.classList.add('hidden');
                const selectElement = sizeOptions.querySelector('select');
                if (selectElement) {
                    selectElement.value = '';
                }
            }
        }
        this.calculateTotal();
    }

    calculateTotal() {
        this.totalCost = 0;
        this.selectedItems = [];
        
        const numBedrooms = parseInt(document.getElementById('numBedrooms')?.value) || 0;
        
        // Calculate bedroom furniture costs
        for (let i = 1; i <= numBedrooms; i++) {
            this.calculateBedroomCost(i);
        }
        
        // Calculate living room costs
        this.calculateLivingRoomCost();
        
        // Calculate kitchen costs
        const numKitchens = parseInt(document.getElementById('numKitchens')?.value) || 0;
        for (let i = 1; i <= numKitchens; i++) {
            this.calculateKitchenCost(i);
        }
        
        // Update display
        this.updateTotalDisplay();
    }

    calculateBedroomCost(roomNumber) {
        const furnitureTypes = ['cupboard', 'bed', 'sideTable', 'dressingTable', 'studyTable', 'wardrobe'];
        
        furnitureTypes.forEach(type => {
            const checkbox = document.getElementById(`${type}_${roomNumber}`);
            if (checkbox?.checked) {
                const cost = this.getFurnitureCost(type, roomNumber);
                if (cost > 0) {
                    this.totalCost += cost;
                    this.selectedItems.push({
                        type: type,
                        room: `Bedroom ${roomNumber}`,
                        cost: cost,
                        size: this.getFurnitureSize(type, roomNumber)
                    });
                }
            }
        });
    }

    calculateLivingRoomCost() {
        const furnitureTypes = ['tvUnit', 'sofa', 'table'];
        
        furnitureTypes.forEach(type => {
            const checkbox = document.getElementById(`${type}_living`);
            if (checkbox?.checked) {
                const cost = this.getFurnitureCost(type, 'living');
                if (cost > 0) {
                    this.totalCost += cost;
                    this.selectedItems.push({
                        type: type,
                        room: 'Living Room',
                        cost: cost,
                        size: this.getFurnitureSize(type, 'living')
                    });
                }
            }
        });
    }

    getFurnitureCost(type, roomNumber) {
        const pricing = this.pricing[type];
        
        if (typeof pricing === 'number') {
            return pricing;
        } else if (typeof pricing === 'object') {
            const sizeSelect = document.querySelector(`#${type}Size_${roomNumber} select`);
            const size = sizeSelect?.value;
            return size ? pricing[size] || 0 : 0;
        }
        
        return 0;
    }

    getFurnitureSize(type, roomNumber) {
        const sizeSelect = document.querySelector(`#${type}Size_${roomNumber} select`);
        return sizeSelect?.options[sizeSelect.selectedIndex]?.text || 'Standard';
    }

    calculateKitchenCost(kitchenNumber) {
        const lengthInput = document.getElementById(`kitchenLength_${kitchenNumber}`);
        const typeSelect = document.getElementById(`kitchenType_${kitchenNumber}`);
        
        if (lengthInput?.value && typeSelect?.value) {
            const lengthCm = parseFloat(lengthInput.value);
            const kitchenType = typeSelect.value;
            
            // Validate length using pricing config
            if (!this.pricing.kitchen.isValidLength(lengthCm)) {
                console.warn(`Invalid kitchen length: ${lengthCm}cm. Must be between ${this.pricing.kitchen.custom.minLength}-${this.pricing.kitchen.custom.maxLength}cm`);
                return;
            }
            
            // Calculate cost using pricing config method
            const cost = this.pricing.kitchen.calculateCost(lengthCm, kitchenType);
            
            if (cost > 0) {
                const typeConfig = this.pricing.kitchen.types[kitchenType];
                const heightCm = this.pricing.kitchen.custom.standardHeight;
                const areaSqCm = lengthCm * heightCm;
                const areaSqMeter = areaSqCm / 10000; // Convert to square meters
                
                this.totalCost += cost;
                this.selectedItems.push({
                    type: 'kitchen',
                    room: `Kitchen ${kitchenNumber}`,
                    cost: cost,
                    size: `Length: ${lengthCm}cm, Height: ${heightCm}cm, Area: ${areaSqMeter.toFixed(2)} sq.m (${typeConfig.label})`,
                    details: {
                        length: lengthCm,
                        height: heightCm,
                        areaSqMeter: areaSqMeter,
                        kitchenType: kitchenType,
                        pricePerSqMeter: typeConfig.pricePerSqMeter
                    }
                });
            }
        }
    }

    updateTotalDisplay() {
        const totalCostElement = document.getElementById('totalCost');
        if (totalCostElement) {
            // Display rounded total without decimal places
            const roundedTotal = Math.round(this.totalCost);
            totalCostElement.textContent = roundedTotal.toLocaleString();
        }
    }

    generateQuote() {
        if (this.totalCost === 0) {
            alert('Please select some items to generate a quote!');
            return;
        }
        
        // Create detailed quote object
        const quote = this.createQuoteObject();
        
        // Show quote summary
        this.showQuoteSummary(quote);
    }

    createQuoteObject() {
        // Use rounded total for quote object so UI and generated quote match
        const total = Math.round(this.totalCost);
        
        return {
            items: this.selectedItems,
            total: total,
            generatedAt: new Date().toISOString(),
            propertyType: document.getElementById('propertyType')?.value || 'custom'
        };
    }

    showQuoteSummary(quote) {
        const summary = `
Quotation Summary:
================
Property Type: ${quote.propertyType.toUpperCase()}
Generated: ${new Date(quote.generatedAt).toLocaleDateString()}

Items:
${quote.items.map(item => `- ${item.room}: ${item.type} (${item.size}) - ₹${item.cost.toLocaleString()}`).join('\n')}

Total: ₹${quote.total.toLocaleString()}

This is an approximate estimate. Please connect with our team on +919975888247 for detailed measurements and final quotation.
        `;
        
        alert(summary);
    }

    // Method to get quote data for PDF generation
    getQuoteData() {
        return this.createQuoteObject();
    }
}

// Initialize calculator when DOM is loaded
let calculator;
document.addEventListener('DOMContentLoaded', function() {
    calculator = new InteriorCalculator();
    window.calculator = calculator; // Make it globally accessible
    console.log('Calculator initialized and assigned to window.calculator');
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { pricing, InteriorCalculator };
}

// For browser environment
if (typeof window !== 'undefined') {
    window.PricingConfig = { pricing, InteriorCalculator };
}