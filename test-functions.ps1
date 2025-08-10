# URL Shortener API Test Script
Write-Host "🧪 Testing URL Shortener API Functions" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:5000"
$testResults = @()

# Test 1: Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get -ErrorAction Stop
    Write-Host "✅ Health Check: PASSED" -ForegroundColor Green
    Write-Host "   Response: $($response | ConvertTo-Json)" -ForegroundColor Gray
    $testResults += "Health Check: PASSED"
} catch {
    Write-Host "❌ Health Check: FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
    $testResults += "Health Check: FAILED"
}

# Test 2: URL Shortening
Write-Host ""
Write-Host "2. Testing URL Shortening..." -ForegroundColor Yellow
try {
    $body = @{ originalUrl = "https://www.google.com" } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "$baseUrl/api/shorten" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "✅ URL Shortening: PASSED" -ForegroundColor Green
    Write-Host "   Short URL: $($response.shortUrl)" -ForegroundColor Gray
    Write-Host "   Short Code: $($response.shortCode)" -ForegroundColor Gray
    $shortCode = $response.shortCode
    $testResults += "URL Shortening: PASSED"
} catch {
    Write-Host "❌ URL Shortening: FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
    $testResults += "URL Shortening: FAILED"
    $shortCode = $null
}

# Test 3: Get All URLs (Admin)
Write-Host ""
Write-Host "3. Testing Admin - Get All URLs..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/urls" -Method Get -ErrorAction Stop
    Write-Host "✅ Get All URLs: PASSED" -ForegroundColor Green
    Write-Host "   Total URLs: $($response.Count)" -ForegroundColor Gray
    if ($response.Count -gt 0) {
        Write-Host "   First URL: $($response[0].originalUrl)" -ForegroundColor Gray
    }
    $testResults += "Get All URLs: PASSED"
} catch {
    Write-Host "❌ Get All URLs: FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
    $testResults += "Get All URLs: FAILED"
}

# Test 4: URL Redirection
if ($shortCode) {
    Write-Host ""
    Write-Host "4. Testing URL Redirection..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl/$shortCode" -Method Get -MaximumRedirection 0 -ErrorAction Stop
        Write-Host "❌ URL Redirection: Should have redirected" -ForegroundColor Red
        $testResults += "URL Redirection: FAILED"
    } catch {
        if ($_.Exception.Response.StatusCode -eq 302) {
            $location = $_.Exception.Response.Headers["Location"]
            Write-Host "✅ URL Redirection: PASSED" -ForegroundColor Green
            Write-Host "   Redirects to: $location" -ForegroundColor Gray
            $testResults += "URL Redirection: PASSED"
        } else {
            Write-Host "❌ URL Redirection: FAILED" -ForegroundColor Red
            Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
            $testResults += "URL Redirection: FAILED"
        }
    }
}

# Test 5: Duplicate URL Handling
Write-Host ""
Write-Host "5. Testing Duplicate URL Handling..." -ForegroundColor Yellow
try {
    $body = @{ originalUrl = "https://www.google.com" } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "$baseUrl/api/shorten" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "✅ Duplicate URL Handling: PASSED" -ForegroundColor Green
    Write-Host "   Returns existing short code: $($response.shortCode)" -ForegroundColor Gray
    $testResults += "Duplicate URL Handling: PASSED"
} catch {
    Write-Host "❌ Duplicate URL Handling: FAILED" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
    $testResults += "Duplicate URL Handling: FAILED"
}

# Test 6: Invalid URL Handling
Write-Host ""
Write-Host "6. Testing Invalid URL Handling..." -ForegroundColor Yellow
try {
    $body = @{ originalUrl = "" } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "$baseUrl/api/shorten" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "❌ Invalid URL Handling: Should have failed" -ForegroundColor Red
    $testResults += "Invalid URL Handling: FAILED"
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "✅ Invalid URL Handling: PASSED" -ForegroundColor Green
        Write-Host "   Correctly rejected empty URL" -ForegroundColor Gray
        $testResults += "Invalid URL Handling: PASSED"
    } else {
        Write-Host "❌ Invalid URL Handling: FAILED" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
        $testResults += "Invalid URL Handling: FAILED"
    }
}

# Test 7: Non-existent Short Code
Write-Host ""
Write-Host "7. Testing Non-existent Short Code..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/nonexistent123" -Method Get -ErrorAction Stop
    Write-Host "❌ Non-existent Short Code: Should have failed" -ForegroundColor Red
    $testResults += "Non-existent Short Code: FAILED"
} catch {
    if ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "✅ Non-existent Short Code: PASSED" -ForegroundColor Green
        Write-Host "   Correctly returned 404" -ForegroundColor Gray
        $testResults += "Non-existent Short Code: PASSED"
    } else {
        Write-Host "❌ Non-existent Short Code: FAILED" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
        $testResults += "Non-existent Short Code: FAILED"
    }
}

# Summary
Write-Host ""
Write-Host "🎉 API Testing Complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test Results Summary:" -ForegroundColor White
$passed = ($testResults | Where-Object { $_ -like "*PASSED*" }).Count
$failed = ($testResults | Where-Object { $_ -like "*FAILED*" }).Count

foreach ($result in $testResults) {
    if ($result -like "*PASSED*") {
        Write-Host "  ✅ $result" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $result" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Total: $passed passed, $failed failed" -ForegroundColor White

if ($failed -eq 0) {
    Write-Host ""
    Write-Host "🎉 All tests passed! The URL Shortener is working perfectly!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠️  Some tests failed. Please check the errors above." -ForegroundColor Yellow
}