<#
    .SYNOPSIS
    Generates client-side .js and .ts files from .proto files
    .PARAMETER PROTO_FILE_NAME
    - If specifed generates files only for one provided .proto file.
    - If not specifed generated files for ALL .proto files in folder
    determined by PROTO_FILES_LOCATION parameter
    .PARAMETER PROTO_FILES_LOCATION
    Path to .proto files.
    .PARAMETER OUT_DIR
    Output directory where all files will be generated. 
    .PARAMETER PROTOC_GEN_TS_ABS_PATH
    Path to protoc-gen-ts.cmd script used to generate .js and .ts files. 
    .EXAMPLE
    .\scripts\Gen-Client.ps1 -PROTO_FILE_NAME greet.proto -PROTO_FILES_LOCATION "src\API\Protos" `
    -OUT_DIR "src\client\src\generated" -PROTOC_GEN_TS_ABS_PATH "src\client\node_modules\.bin"
    .NOTES
        Created by    : Arkadiusz Kasprzak
        Date Coded    : 09.06.2022
        Last Modified : 09.06.2022
#>

param(
    [Parameter(Mandatory = $false)][string]$PROTO_FILE_NAME = $null,
    [Parameter(Mandatory = $false)][string]$PROTO_FILES_LOCATION = "src\API\Protos",
    [Parameter(Mandatory = $false)][string]$OUT_DIR = "src\client\src\generated",
    [Parameter(Mandatory = $false)][string]$PROTOC_GEN_TS_ABS_PATH = "src\client\node_modules\.bin"
)

$protoFiles = if ($PROTO_FILE_NAME)
{
    $PROTO_FILE_NAME
}
else
{
    Get-ChildItem -Path $PROTO_FILES_LOCATION -Filter *.proto -Recurse -File -Name
}

Write-Host "Generating files from the following .proto files:" -ForegroundColor Green

foreach ($PROTO_FILE_NAME in $protoFiles)
{
    Write-Host "- $PROTO_FILE_NAME"
    $dotPos = $PROTO_FILE_NAME.LastIndexOf(".")
    $slashPos = $PROTO_FILE_NAME.LastIndexOf("\")
    $DEST_FOLDER = $PROTO_FILE_NAME.Substring($slashPos + 1, $dotPos - $slashPos - 1)

    $FINAL_DIR = "$OUT_DIR\$DEST_FOLDER"
    New-Item -ItemType Directory -Force -Path $FINAL_DIR | Out-Null

    protoc --proto_path=$PROTO_FILES_LOCATION `
    --plugin=protoc-gen-ts="$PROTOC_GEN_TS_ABS_PATH\protoc-gen-ts.cmd" `
    --js_out="import_style=commonjs,binary:$FINAL_DIR" `
    --ts_out="service=grpc-web:$FINAL_DIR" $PROTO_FILE_NAME
}