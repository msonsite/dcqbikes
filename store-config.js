// Store Configuration
// Easy to find and modify store closure settings

// ============================================
// MANUAL CLOSED OVERRIDE
// ============================================
// Set to true to force store status to "Gesloten" (e.g., for holidays, special events)
// Set back to false to restore normal opening hours
const MANUAL_CLOSED_OVERRIDE = false;


// ============================================
// VACATION PERIODS
// ============================================
// Add your vacation periods here
const VACATION_PERIODS = [
    {
        start: [2025, 12, 24],  
        end: [2026, 1, 1]        
    },
    {
        start: [2026, 7, 14],  
        end: [2026, 7, 31]     
    },
];


// ============================================
// INDIVIDUAL HOLIDAY DATES (OPTIONAL)
// ============================================
// To add specific holiday dates that don't fall in vacation periods

const HOLIDAY_DATES = [
    // [2025, 11, 1],
];