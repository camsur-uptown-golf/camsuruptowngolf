param(
    [Parameter(Mandatory = $true)][string]$WorkbookPath
)

$ErrorActionPreference = 'Stop'
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$workbook = $null

try {
    $workbook = $excel.Workbooks.Open($WorkbookPath, 0, $false)
    $excel.CalculateFullRebuild()
    $workbook.Save()
}
finally {
    if ($workbook) { $workbook.Close($true) }
    $excel.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
