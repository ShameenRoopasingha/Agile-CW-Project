const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const { search, replace } of replacements) {
        content = content.replace(search, replace);
    }
    fs.writeFileSync(filePath, content, 'utf8');
}

// src/layout/CitizenLayout.tsx
replaceInFile('src/layout/CitizenLayout.tsx', [
    { search: /const getPageInfo = \(\) => {[\s\S]*?};\n\n/g, replace: '' }
]);

// src/layout/FleetLayout.tsx
replaceInFile('src/layout/FleetLayout.tsx', [
    { search: /,\s*useNavigate/g, replace: '' }
]);

// src/pages/admin/Complaints.tsx
replaceInFile('src/pages/admin/Complaints.tsx', [
    { search: /,\s*Bars3BottomRightIcon/g, replace: '' }
]);

// src/pages/citizen/SelectCollectionPoint.tsx
replaceInFile('src/pages/citizen/SelectCollectionPoint.tsx', [
    { search: /const \[selectedPoint, setSelectedPoint\] = useState<any>\(null\);/g, replace: 'const [, setSelectedPoint] = useState<any>(null);' }
]);

// src/pages/fleet/RoutesOverview.tsx
replaceInFile('src/pages/fleet/RoutesOverview.tsx', [
    { search: /,\s*getAllRoutesForWeek/g, replace: '' },
    { search: /import L from "leaflet";/g, replace: '' },
    { search: /import markerIcon from "leaflet\/dist\/images\/marker-icon.png";/g, replace: '' },
    { search: /import markerShadow from "leaflet\/dist\/images\/marker-shadow.png";/g, replace: '' },
    { search: /const \[collectionPoints, setCollectionPoints\] = useState<any\[\]>\(\[\]\);/g, replace: '' }
]);

// src/pages/Guidelines.tsx
replaceInFile('src/pages/Guidelines.tsx', [
    { search: /const LeafSvg = \(\) => \([\s\S]*?\);\n/g, replace: '' }
]);

// src/pages/ResetPassword.tsx
replaceInFile('src/pages/ResetPassword.tsx', [
    { search: /,\s*useNavigate/g, replace: '' }
]);

console.log("Done fixing TS errors round 2");
