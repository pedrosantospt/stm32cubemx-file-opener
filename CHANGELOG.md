# Changelog

All notable changes to the "stm32cubemx-file-opener" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-04-08

### Added

- Support for the new per-user installation path on Windows (`%LOCALAPPDATA%\Programs\STM32CubeMX\STM32CubeMX.exe`) introduced in CubeMX 6.10.0+.
- Fallback to the `STM32CubeMX_PATH` environment variable set by the installer.

## [0.2.0] - 2026-03-31

### Changed

- STM32CubeMX is now launched as a detached process, so the "Opened in STM32CubeMX" notification appears immediately instead of waiting for CubeMX to close.

## [0.1.0] - 2024-09-27

### Fixed

- Automatic path detection for macOS and Linux.

### Added

- Clickable error message to directly open extension settings when STM32CubeMX path is not found.
- Extension logo.

## [0.0.1] - 2024-09-26

### Added

- Right-click context menu to open `.ioc` files with STM32CubeMX.
- Automatic path detection for Windows, macOS, and Linux.
- Option to manually configure the path to STM32CubeMX.

[0.3.0]: https://github.com/pedrosantospt/stm32cubemx-file-opener/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/pedrosantospt/stm32cubemx-file-opener/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/pedrosantospt/stm32cubemx-file-opener/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/pedrosantospt/stm32cubemx-file-opener/releases/tag/v0.0.1