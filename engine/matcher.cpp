#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

std::vector<std::string> split(std::string s) {
    std::vector<std::string> res;
    std::stringstream ss(s);
    std::string item;
    while (std::getline(ss, item, ',')) {
        item.erase(0, item.find_first_not_of(" ")); // Trim
        std::transform(item.begin(), item.end(), item.begin(), ::tolower);
        res.push_back(item);
    }
    return res;
}

int main(int argc, char* argv[]) {
    if (argc < 3) return 0;

    std::vector<std::string> user = split(argv[1]);
    std::vector<std::string> role = split(argv[2]);

    float matches = 0;
    for (const auto& u : user) {
        if (std::find(role.begin(), role.end(), u) != role.end()) {
            matches++;
        }
    }

    // Output compatibility percentage
    std::cout << (int)((matches / role.size()) * 100);
    return 0;
}