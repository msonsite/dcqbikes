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
// Format: [year, month (1-12), day]
// Example: { start: [2025, 12, 24], end: [2026, 1, 1] } = Dec 24, 2025 to Jan 1, 2026
const VACATION_PERIODS = [
    {
        start: [2025, 12, 24],  // Start date: December 24, 2025
        end: [2026, 1, 1]        // End date: January 1, 2026
    },
    {
        start: [2026, 7, 14],   // Start date: July 14, 2026
        end: [2026, 7, 31]       // End date: July 31, 2026
    },
    // Add more vacation periods below as needed
    // {
    //     start: [2026, 12, 24],
    //     end: [2027, 1, 1]
    // },
];


// ============================================
// INDIVIDUAL HOLIDAY DATES (OPTIONAL)
// ============================================
// If you want to add specific holiday dates that don't fall in vacation periods,
// you can add them here. Format: [year, month (1-12), day]
// Example: [2025, 11, 1] = November 1, 2025 (Allerheiligen)
const HOLIDAY_DATES = [
    // [2025, 11, 1],  // All Saints' Day (Allerheiligen) - November 1, 2025
    // [2025, 12, 25], // Christmas - December 25, 2025
    // Add more specific holiday dates here
];

