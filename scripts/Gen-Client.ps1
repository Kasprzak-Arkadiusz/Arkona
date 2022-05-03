param(
    [Parameter(Mandatory=$true)][string]$PROTO_FILE,
    [string]$dir=$null
)

if (!$dir)
{
    $dotPos = $PROTO_FILE.LastIndexOf(".")
    Write-Host "dotPos = $dotPos"
    $slashPos = $PROTO_FILE.LastIndexOf("\")
    Write-Host "slashPos = $slashPos"
    $dir = $PROTO_FILE.Substring($slashPos + 1, $dotPos-$slashPos-1)
    Write-Host $dir
}

$PROTOC_GEN_TS_PATH="C:\Users\PC\source\repos\Studia\Projekt inżynierski\Arkona\src\client\node_modules\.bin"
$OUT_DIR="src\client\src\generated\$dir"
$PROTO_FILES_LOCATION="src\API\Protos\"

New-Item -ItemType Directory -Force -Path $OUT_DIR | Out-Null

protoc --proto_path=$PROTO_FILES_LOCATION `
--plugin=protoc-gen-ts="$PROTOC_GEN_TS_PATH\protoc-gen-ts.cmd" `
--js_out="import_style=commonjs,binary:$OUT_DIR" `
--ts_out="service=grpc-web:$OUT_DIR" $PROTO_FILE