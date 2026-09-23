param(
    [Parameter(Mandatory = $true)][string]$WorkbookPath,
    [Parameter(Mandatory = $true)][string]$OutputDir
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$workbook = $null

try {
    $workbook = $excel.Workbooks.Open($WorkbookPath, 0, $true)
    $captures = @(
        @{ Sheet = 'Dashboard'; Range = 'B2:G32'; Name = 'dashboard' },
        @{ Sheet = 'Test Cases'; Range = 'A1:K12'; Name = 'test-cases-top' },
        @{ Sheet = 'Test Cases'; Range = 'A43:K51'; Name = 'responsive-cases' },
        @{ Sheet = 'Test Cases'; Range = 'A99:K108'; Name = 'navigation-cases' },
        @{ Sheet = 'Test Cases'; Range = 'A129:K148'; Name = 'accessibility-cases' }
    )

    foreach ($capture in $captures) {
        $sheet = $workbook.Worksheets.Item($capture.Sheet)
        $range = $sheet.Range($capture.Range)
        $sheet.Activate()
        $range.Select()
        $range.CopyPicture(1, 2)
        Start-Sleep -Milliseconds 500
        $image = [System.Windows.Forms.Clipboard]::GetImage()
        if ($null -eq $image) {
            throw "Excel did not place an image on the clipboard for $($capture.Sheet)!$($capture.Range)"
        }
        try {
            $outputPath = Join-Path $OutputDir ($capture.Name + '.png')
            $image.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        }
        finally {
            $image.Dispose()
        }
    }
}
finally {
    if ($workbook) { $workbook.Close($false) }
    $excel.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
