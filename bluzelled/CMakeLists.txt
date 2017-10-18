cmake_minimum_required(VERSION 3.7)

function(list_cmake_properties)
    get_cmake_property(_variableNames VARIABLES)
    foreach (_variableName ${_variableNames})
        message(STATUS "${_variableName}=${${_variableName}}")
    endforeach()
endfunction()

project(bluzelled)
###############################################################################
## bluzelled
message(STATUS "*** CMakeLists for Bluzelled Starts")
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_VERBOSE_MAKEFILE OFF)

file(COPY assets/web DESTINATION ${CMAKE_BINARY_DIR})

if(MSVC)
    add_compile_options(/W4)
elseif(UNIX AND NOT APPLE)
    message(STATUS "***** UNIX!!!!!!!!!!!!!!!")
    add_compile_options(-lrt)
elseif(APPLE)
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(Boost 1.64.0 REQUIRED COMPONENTS system coroutine thread REQUIRED)
if(Boost_FOUND)
    include_directories(${Boost_INCLUDE_DIRS})
endif()

include_directories(
        inc
        inc/containers
        third_party/beast
)

set(SOURCE_FILES
        inc/Node.h
        inc/containers/CMap.h
        inc/containers/CSet.h
        src/main.cpp
        src/Node.cpp
        src/Task.cpp
        inc/Task.h
        inc/NodeUtilities.h
        src/NodeUtilities.cpp
        src/WebSocket.cpp
        inc/WebSocket.h
        )

add_executable(bluzelled ${SOURCE_FILES})
target_link_libraries(
        bluzelled
        ${Boost_LIBRARIES}
)


###############################################################################
# Unit tests
message(STATUS "*** CMakeLists for bluzelled_test")
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_VERBOSE_MAKEFILE OFF)
if(MSVC)
    message(STATUS "***** MSVC *****")
    add_compile_options(/W4)
elseif(UNIX AND NOT APPLE)
    message(STATUS "***** UNIX *****")
    add_compile_options(-lrt)
else(APPLE)
    message(STATUS "***** APPLE *****")
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()


find_package(Boost 1.64.0 COMPONENTS unit_test_framework thread system timer REQUIRED)
if(Boost_FOUND)
    include_directories(${Boost_INCLUDE_DIRS})
endif()

enable_testing()
set(SOURCE_FILES
        inc/containers/CMap.h
        src/test.cpp
        inc/containers/CSet.h
        src/Task.cpp
        inc/Task.h
        inc/NodeUtilities.h
        src/NodeUtilities.cpp
        src/cmap_test.cpp
        src/node_test.cpp
        )
file(COPY assets/words.txt DESTINATION ${CMAKE_BINARY_DIR})
add_executable(bluzelled_test ${SOURCE_FILES})
target_link_libraries(bluzelled_test ${Boost_LIBRARIES} )


message(STATUS "*** CMakeLists for Bluzelled Ends\n\n")



