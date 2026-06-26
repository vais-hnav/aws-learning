param(
    [string]$ProfileName = $env:AWS_PROFILE
)

$ErrorActionPreference = 'Stop'

try {
    Import-Module AWS.Tools.Common -ErrorAction Stop
    Import-Module AWS.Tools.IdentityManagement -ErrorAction Stop

    if ($ProfileName) {
        Set-AWSCredential -ProfileName $ProfileName | Out-Null
    }

    Get-IAMUserList | ForEach-Object {
        $_.Arn
    }
}
catch {
    Write-Error $_
    exit 1
}
