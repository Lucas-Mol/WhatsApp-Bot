@echo off
if not exist .\node_modules\ (
    call npm i
)
call npm start
exit