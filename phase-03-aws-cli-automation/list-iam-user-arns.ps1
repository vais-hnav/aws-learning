param(
    [string]$ProfileName
)

Import-Module AWS.Tools.IdentityManagement -ErrorAction Stop

$cmdletArgs = @{}
if ($ProfileName) {
    $cmdletArgs.ProfileName = $ProfileName
}

$iamUsers = Get-IAMUserList @cmdletArgs
foreach ($user in $iamUsers) {
    Write-Host "USER: $($user.UserName) ARN: $($user.Arn)"
}
