#!/bin/bash

# SMOLITUX CORE UTILITIES
# Shared utility functions for Smolitux scripts

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Package list
PACKAGES=("core" "theme" "utils" "testing" "layout" "charts" "media" "community" "ai" "blockchain" "resonance" "federation" "voice-control")

# Log functions
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

log_section() {
  echo -e "\n${MAGENTA}=== $1 ===${NC}"
}

# Validation functions
validate_package() {
  local package=$1
  
  if [[ ! " ${PACKAGES[@]} " =~ " ${package} " ]]; then
    log_error "Invalid package: $package"
    log_info "Available packages: ${PACKAGES[*]}"
    return 1
  fi
  
  if [ ! -d "packages/@smolitux/$package" ]; then
    log_error "Package directory not found: packages/@smolitux/$package"
    return 1
  fi
  
  return 0
}

validate_component() {
  local package=$1
  local component=$2
  
  if [ ! -d "packages/@smolitux/$package/src/components/$component" ]; then
    log_error "Component directory not found: packages/@smolitux/$package/src/components/$component"
    return 1
  fi
  
  return 0
}

# File functions
count_files() {
  local dir=$1
  local pattern=$2
  
  find "$dir" -name "$pattern" 2>/dev/null | wc -l
}

# Component functions
get_component_list() {
  local package=$1
  
  find "packages/@smolitux/$package/src/components" -type d -mindepth 1 -maxdepth 1 2>/dev/null | while read -r dir; do
    basename "$dir"
  done
}

get_component_status() {
  local package=$1
  local component=$2
  
  local component_file="packages/@smolitux/$package/src/components/$component/$component.tsx"
  local test_file="packages/@smolitux/$package/src/components/$component/$component.test.tsx"
  local story_file="packages/@smolitux/$package/src/components/$component/$component.stories.tsx"
  
  local component_status="❌"
  local test_status="❌"
  local story_status="❌"
  
  [ -f "$component_file" ] && component_status="✅"
  [ -f "$test_file" ] && test_status="✅"
  [ -f "$story_file" ] && story_status="✅"
  
  echo "$component:$component_status:$test_status:$story_status"
}

# Package functions
get_package_status() {
  local package=$1
  
  local component_count=$(count_files "packages/@smolitux/$package/src/components" "*.tsx" | grep -v "\.test\.\|\.stories\.")
  local test_count=$(count_files "packages/@smolitux/$package/src/components" "*.test.tsx")
  local story_count=$(count_files "packages/@smolitux/$package/src/components" "*.stories.tsx")
  
  local test_percent=0
  local story_percent=0
  
  if [ "$component_count" -gt 0 ]; then
    test_percent=$(( test_count * 100 / component_count ))
    story_percent=$(( story_count * 100 / component_count ))
  fi
  
  echo "$package:$component_count:$test_count:$story_count:$test_percent:$story_percent"
}

# Progress tracking functions
update_component_status() {
  local package=$1
  local component=$2
  local status=$3
  
  echo "✅ $package/$component: $status ($(date))" >> COMPONENT_STATUS.md
}

# Help functions
show_help() {
  local script_name=$(basename "$0")
  
  echo "Usage: $script_name [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  --package PACKAGE    Specify package name"
  echo "  --component COMPONENT Specify component name"
  echo "  --all                Process all packages"
  echo "  --detailed           Generate detailed output"
  echo "  --help               Show this help message"
  echo ""
  echo "Available packages: ${PACKAGES[*]}"
}

# Parse arguments
parse_args() {
  PACKAGE=""
  COMPONENT=""
  ALL=false
  DETAILED=false
  
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --package)
        PACKAGE="$2"
        shift 2
        ;;
      --component)
        COMPONENT="$2"
        shift 2
        ;;
      --all)
        ALL=true
        shift
        ;;
      --detailed)
        DETAILED=true
        shift
        ;;
      --help)
        show_help
        exit 0
        ;;
      *)
        log_error "Unknown option: $1"
        show_help
        exit 1
        ;;
    esac
  done
  
  # Validate arguments
  if [ "$ALL" = false ] && [ -z "$PACKAGE" ]; then
    log_error "No package specified. Use --package PACKAGE or --all"
    show_help
    exit 1
  fi
  
  if [ -n "$PACKAGE" ]; then
    validate_package "$PACKAGE" || exit 1
  fi
  
  if [ -n "$COMPONENT" ]; then
    validate_component "$PACKAGE" "$COMPONENT" || exit 1
  fi
}

# Export functions
export -f log_info
export -f log_success
export -f log_warning
export -f log_error
export -f log_section
export -f validate_package
export -f validate_component
export -f count_files
export -f get_component_list
export -f get_component_status
export -f get_package_status
export -f update_component_status
export -f show_help
export -f parse_args