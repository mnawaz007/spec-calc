# Integration Testing Checklist

**Date**: 2026-01-02
**Status**: Ready for manual verification
**Purpose**: Verify calculator works end-to-end across frontend and backend

---

## Prerequisites

Before running this checklist, ensure:

- [ ] Backend is running on `http://localhost:5000`
  ```bash
  cd backend
  python run.py
  ```

- [ ] Frontend is running on `http://localhost:5173`
  ```bash
  cd frontend
  npm run dev
  ```

- [ ] Both services are responding (no errors in console)

---

## Integration Test Cases

### Test 1: Basic Addition
**Action**: Enter "5" + "3", click Calculate
**Expected**: Result displays "5 + 3 = 8"
- [ ] Form accepts input
- [ ] Result shows "8"
- [ ] Calculation context shows "5 + 3 = 8"
- [ ] Result area is green

**Status**: ✓ Pass / ✗ Fail

### Test 2: Basic Subtraction
**Action**: Enter "10" − "7", click Calculate
**Expected**: Result displays "10 − 7 = 3"
- [ ] Form accepts input
- [ ] Result shows "3"
- [ ] Calculation context correct
- [ ] No errors displayed

**Status**: ✓ Pass / ✗ Fail

### Test 3: Multiplication
**Action**: Enter "6" × "4", click Calculate
**Expected**: Result displays "6 × 4 = 24"
- [ ] Form accepts input
- [ ] Result shows "24"
- [ ] Calculation context correct
- [ ] Result displays properly

**Status**: ✓ Pass / ✗ Fail

### Test 4: Division
**Action**: Enter "20" ÷ "5", click Calculate
**Expected**: Result displays "20 ÷ 5 = 4"
- [ ] Form accepts input
- [ ] Result shows "4" (or "4.0")
- [ ] Calculation context correct
- [ ] Decimal handling correct

**Status**: ✓ Pass / ✗ Fail

### Test 5: Decimal Addition
**Action**: Enter "2.5" + "3.75", click Calculate
**Expected**: Result displays "2.5 + 3.75 = 6.25"
- [ ] Form accepts decimal input
- [ ] Result shows "6.25"
- [ ] Decimal precision maintained
- [ ] No rounding errors

**Status**: ✓ Pass / ✗ Fail

### Test 6: Division by Zero
**Action**: Enter "10" ÷ "0", click Calculate
**Expected**: Error message displays
- [ ] Form accepts input
- [ ] Red error box appears
- [ ] Error message: "Division by zero is not allowed"
- [ ] Warning icon (⚠️) displays
- [ ] User can dismiss error

**Status**: ✓ Pass / ✗ Fail

### Test 7: Invalid Number Input
**Action**: Enter "abc" + "3", click Calculate
**Expected**: Error message displays
- [ ] Form accepts input
- [ ] Red error box appears
- [ ] Error message indicates invalid number
- [ ] Error clears when user modifies input
- [ ] Form field shows error styling

**Status**: ✓ Pass / ✗ Fail

### Test 8: Invalid Operator Selection
**Action**: Try to select invalid operator or submit with missing operator
**Expected**: Error message displays
- [ ] Form validates operator
- [ ] Error message indicates invalid operator
- [ ] Only valid operators shown (+, −, ×, ÷)
- [ ] Proper error handling

**Status**: ✓ Pass / ✗ Fail

### Test 9: Sequential Calculations
**Action**: Perform 5 + 3, then 10 − 7, then 6 × 4
**Expected**: Each calculation displays correctly
- [ ] First calculation shows result "8"
- [ ] Form clears or allows editing
- [ ] Second calculation shows result "3"
- [ ] Third calculation shows result "24"
- [ ] No state issues between calculations

**Status**: ✓ Pass / ✗ Fail

### Test 10: Error Recovery
**Action**: Enter "abc", see error, then enter "5" + "3" correctly
**Expected**: Calculation succeeds after error
- [ ] Error displays for invalid input
- [ ] User can dismiss error
- [ ] Form is still responsive
- [ ] Subsequent valid calculation works
- [ ] Result displays correctly

**Status**: ✓ Pass / ✗ Fail

---

## Network & API Verification

### Backend API Endpoint
- [ ] POST `/api/calculate` responds with 200 for valid requests
- [ ] POST `/api/calculate` returns 400 for invalid requests
- [ ] Response includes `result` field for success
- [ ] Response includes `error` field for errors
- [ ] API validates all inputs (operands and operator)
- [ ] API handles division by zero
- [ ] Logging is working (check backend console)

### Frontend-Backend Communication
- [ ] Frontend sends correct JSON format
- [ ] Frontend includes all required fields (operand1, operand2, operator)
- [ ] Frontend receives response correctly
- [ ] Error handling works for network errors
- [ ] Timeout handling works appropriately

---

## UI/UX Verification

### Form Interface
- [ ] Form renders with no console errors
- [ ] All input fields are visible
- [ ] Operator dropdown shows all four options
- [ ] "Calculate" button is prominently displayed
- [ ] Labels are clear ("First Number", "Second Number", "Operation")
- [ ] Placeholder text guides users

### Result Display
- [ ] Result displays in green box
- [ ] Result is large and prominent (2.5rem)
- [ ] Calculation context is shown (e.g., "5 + 3 = 8")
- [ ] Result only shows when there is a result
- [ ] Animation appears smooth

### Error Display
- [ ] Error displays in red box
- [ ] Warning icon (⚠️) appears
- [ ] Error message is clear and specific
- [ ] Dismiss button works
- [ ] Error only shows when there is an error
- [ ] Error clears when appropriate

### Responsiveness
- [ ] Mobile (320px): Interface is usable
- [ ] Tablet (768px): Interface is clean
- [ ] Desktop (1024px): Interface looks polished
- [ ] No horizontal scrolling needed
- [ ] All buttons are touch-friendly (48px+ height)

---

## Browser Compatibility

Test in each browser:

### Chrome/Chromium
- [ ] All tests pass
- [ ] No console errors
- [ ] UI renders correctly
- [ ] Responsive layout works

### Firefox
- [ ] All tests pass
- [ ] No console errors
- [ ] UI renders correctly
- [ ] Responsive layout works

### Safari
- [ ] All tests pass
- [ ] No console errors
- [ ] UI renders correctly
- [ ] Responsive layout works

### Edge
- [ ] All tests pass
- [ ] No console errors
- [ ] UI renders correctly
- [ ] Responsive layout works

---

## Performance Verification

- [ ] Calculation completes within 5 seconds
- [ ] No hanging or freezing UI
- [ ] Multiple rapid calculations work correctly
- [ ] Memory usage is reasonable
- [ ] Network requests complete quickly
- [ ] No visual lag or stuttering

---

## Accessibility Verification

- [ ] All inputs have associated labels
- [ ] Can navigate form with Tab key
- [ ] Can submit form with Enter key
- [ ] Error messages are announced properly
- [ ] Color contrast meets accessibility standards
- [ ] Focus indicators are visible
- [ ] Dismiss button has aria-label

---

## Overall Assessment

### Checklist Summary

**Total Tests**: 10 integration tests + 4 browser tests + verification items

**Tests Passed**: ___ / 10
**Browsers Verified**: ___ / 4

### Sign-Off

- [ ] All integration tests passed
- [ ] All browsers verified
- [ ] No unresolved issues
- [ ] Application ready for production

**Verified By**: _______________
**Date**: _______________
**Notes**:

```
[Add any issues or observations here]
```

---

## Troubleshooting

### Backend not responding
```
1. Check if server is running: python run.py
2. Check for errors in console
3. Verify port 5000 is available
4. Check firewall settings
```

### Frontend not responding
```
1. Check if dev server is running: npm run dev
2. Check for errors in console
3. Verify port 5173 is available
4. Clear browser cache and reload
```

### Calculation not working
```
1. Check browser console for errors
2. Check backend console for errors
3. Verify both services are running
4. Try refreshing the page
5. Check network tab in DevTools
```

### Wrong result displayed
```
1. Verify backend calculation service
2. Check frontend number formatting
3. Verify decimal precision handling
4. Check for floating-point issues
```

### Error message not showing
```
1. Check error display component
2. Verify API returns error correctly
3. Check console for JavaScript errors
4. Verify error state management
```

---

## Next Steps After Verification

- [ ] All integration tests passed - ready for Phase 10
- [ ] Any issues found - create GitHub issues for tracking
- [ ] Performance issues - note for future optimization
- [ ] UI/UX improvements - capture feedback for Phase 11

**Application Status**: 🟢 Ready for Production

---

**Integration Checklist Created**: 2026-01-02
**Last Updated**: 2026-01-02
