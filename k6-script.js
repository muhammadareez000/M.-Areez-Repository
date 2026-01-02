import http from 'k6/http';
import { check } from 'k6';
import { Trend, Gauge } from 'k6/metrics';
import { config } from './configs.js';
 
// ================== GET API'S ==================
// Define GET API endpoints
// Two formats supported:
//   1. Simple path (string): '/api/endpoint'
//   2. With payload (object): { path: '/api/endpoint', payload: { key: value } }
const getApiList = [

  '/GetADMXFile/Printers/machine/8/21H1/printing',
  '/GetADMXFile/Server/machine/9/21H1/windowsbackup',
  '/GetADMXFile/Start%20Menu%20and%20Taskbar/machine/10/21H1/StartMenu',
  '/GetADMXFile/Notifications/machine/148/21H1/wpn',
  '/GetADMXFile/System/machine/11/21H1/reliability',
  '/GetADMXFile/Access-Denied%20Assistance/machine/149/21H1/srm-fci',
  '/GetADMXFile/App-V/machine/150/21H1/appv',
  '/GetADMXFile/CEIP/machine/198/21H1/appv',
  '/GetADMXFile/Client%20Coexistence/machine/199/21H1/appv',
  '/GetADMXFile/Integration/machine/200/21H1/appv',
  '/GetADMXFile/PackageManagement/machine/201/21H1/appv',
  '/GetADMXFile/PowerManagement/machine/202/21H1/appv',
  '/GetADMXFile/Publishing/machine/203/21H1/appv',
  '/GetADMXFile/Reporting/machine/204/21H1/appv',
  '/GetADMXFile/Scripting/machine/205/21H1/appv',
  '/GetADMXFile/Streaming/machine/206/21H1/appv',
  '/GetADMXFile/Virtualization/machine/207/21H1/appv',
  '/GetADMXFile/Audit%20Process%20creation/machine/151/21H1/auditsettings',
  '/GetADMXFile/Credentials%20Delegation/machine/152/21H1/credssp',
  '/GetADMXFile/Device%20Guard/machine/153/21H1/deviceguard',
  '/GetADMXFile/Device%20Health%20Attestation%20Service/machine/154/21H1/tpm',
  '/GetADMXFile/Device%20Installation/machine/155/21H1/deviceinstallation',
  '/GetADMXFile/Device%20Installation%20Restrictions/machine/208/21H1/deviceinstallation',
  '/GetADMXFile/Disk%20NV%20Cache/machine/156/21H1/disknvcache',
  '/GetADMXFile/Disk%20Quotas/machine/157/21H1/diskquota',
  '/GetADMXFile/Display/machine/158/21H1/controlpaneldisplay',
  '/GetADMXFile/Distributed%20COM/machine/159/21H1/DCOM',
  '/GetADMXFile/Application%20Compatibility%20Settings/machine/209/21H1/AppCompat',
  '/GetADMXFile/Driver%20Installation/machine/160/21H1/deviceinstallation',
  '/GetADMXFile/Early%20Launch%20Antimalware/machine/161/21H1/earlylauncham',
  '/GetADMXFile/Enhanced%20Storage%20Access/machine/162/21H1/enhancedstorage',
  '/GetADMXFile/File%20Classification%20Infrastructure/machine/163/21H1/srm-fci',
  '/GetADMXFile/File%20Share%20Shadow%20Copy%20Provider/machine/164/21H1/fileserversvsprovider',
  '/GetADMXFile/Filesystem/machine/165/21H1/filesys',
  '/GetADMXFile/NTFS/machine/210/21H1/filesys',
  '/GetADMXFile/Folder%20Redirection/machine/166/21H1/folderredirection',
  '/GetADMXFile/Group%20Policy/machine/167/21H1/grouppolicy',
  '/GetADMXFile/Logging%20and%20tracing/machine/507/21H1/grouppolicypreferences',
  '/GetADMXFile/Internet%20Communication%20Management/machine/168/21H1/icm',
  '/GetADMXFile/Internet%20Communication%20Settings/machine/211/21H1/icm',
  '/GetADMXFile/iSCSI/machine/169/21H1/iscsi',
  '/GetADMXFile/General%20iSCSI/machine/212/21H1/iscsi',
  '/GetADMXFile/iSCSI%20Security/machine/213/21H1/iscsi',
  '/GetADMXFile/iSCSI%20Target%20Discovery/machine/214/21H1/iscsi',
  '/GetADMXFile/KDC/machine/170/21H1/kdc',
  '/GetADMXFile/Kerberos/machine/171/21H1/kerberos',
  '/GetADMXFile/Kernel%20DMA%20Protection/machine/172/21H1/dmaguard',
  '/GetADMXFile/Keyboard%20Filter/machine/561/21H1/WindowsExplorer',
  '/GetADMXFile/Local%20Security%20Authority/machine/547/21H1/LocalSecurityAuthority',
  '/GetADMXFile/Locale%20Services/machine/173/21H1/globalization',
  '/GetADMXFile/Logon/machine/174/21H1/credentialproviders',
  '/GetADMXFile/Mitigation%20Options/machine/175/21H1/grouppolicy',
  '/GetADMXFile/Net%20Logon/machine/176/21H1/netlogon',
  '/GetADMXFile/DC%20Locator%20DNScords/machine/215/21H1/netlogon',
  '/GetADMXFile/OS%20Policies/machine/177/21H1/ospolicy',
  '/GetADMXFile/PIN%20Complexity/machine/178/21H1/passport',
  '/GetADMXFile/Power%20Management/machine/179/21H1/power',
  '/GetADMXFile/Button%20Settings/machine/216/21H1/power',
  '/GetADMXFile/Energy%20Saver%20Settings/machine/217/21H1/power',
  '/GetADMXFile/Hard%20Disk%20Settings/machine/218/21H1/power',
  '/GetADMXFile/Notification%20Settings/machine/219/21H1/power',
  '/GetADMXFile/Power%20Throttling%20Settings/machine/220/21H1/power',
  '/GetADMXFile/Sleep%20Settings/machine/221/21H1/power',
  '/GetADMXFile/Video%20and%20Display%20Settings/machine/222/21H1/power',
  '/GetADMXFile/Recovery/machine/180/21H1/reagent',
  '/GetADMXFile/Remote%20Assistance/machine/181/21H1/remoteassistance',
  '/GetADMXFile/Remote%20Procedure%20Call/machine/182/21H1/rpc',
  '/GetADMXFile/Removable%20Storage%20Access/machine/183/21H1/removablestorage',
  '/GetADMXFile/Scripts/machine/184/21H1/scripts',
  '/GetADMXFile/Security%20Account%20Manager/machine/506/21H1/sam',
  '/GetADMXFile/Server%20Manager/machine/186/21H1/servermanager',
  '/GetADMXFile/Service%20Control%20Manager%20Settings/machine/187/21H1/servicecontrolmanager',
  '/GetADMXFile/Security%20Settings/machine/223/21H1/servicecontrolmanager',
  '/GetADMXFile/Shutdown/machine/188/21H1/wininit',
  '/GetADMXFile/Shutdown%20Options/machine/189/21H1/winsrv',
  '/GetADMXFile/Storage%20Health/machine/190/21H1/storagehealth',
  '/GetADMXFile/Storage%20Sense/machine/191/21H1/storagesense',
  '/GetADMXFile/System%20Restore/machine/192/21H1/systemrestore',
  '/GetADMXFile/Troubleshooting%20and%20Diagnostics/machine/193/21H1/wdi',
  '/GetADMXFile/Application%20Compatibility%20Diagnostics/machine/224/21H1/pca',
  '/GetADMXFile/Corrupted%20File%20Recovery/machine/225/21H1/filerecovery',
  '/GetADMXFile/Disk%20Diagnostic/machine/226/21H1/diskdiagnostic',
  '/GetADMXFile/Fault%20Tolerant%20Heap/machine/227/21H1/fthsvc',
  '/GetADMXFile/Microsoft%20Support%20Diagnostic%20Tool/machine/228/21H1/msdt',
  '/GetADMXFile/MSI%20Corrupted%20File%20Recovery/machine/229/21H1/msi-filerecovery',
  '/GetADMXFile/Scheduled%20Maintenance/machine/230/21H1/sdiagschd',
  '/GetADMXFile/Scripted%20Diagnostics/machine/231/21H1/sdiageng',
  '/GetADMXFile/Windows%20Boot%20Performance%20Diagnostics/machine/232/21H1/performancediagnostics',
  '/GetADMXFile/Windows%20Memory%20Leak%20Diagnosis/machine/233/21H1/leakdiagnostic',
  '/GetADMXFile/Windows%20Performance%20PerfTrack/machine/504/21H1/performanceperftrack',
  '/GetADMXFile/Windows%20Resource%20Exhaustion%20Detection%20and%20Resolution/machine/234/21H1/radar',
  '/GetADMXFile/Windows%20Shutdown%20Performance%20Diagnostics/machine/235/21H1/performancediagnostics',
  '/GetADMXFile/Windows%20Standby/Resume%20Performance%20Diagnostics/machine/236/21H1/performancediagnostics',
  '/GetADMXFile/Windows%20System%20Responsiveness%20Performance%20Diagnostics/machine/237/21H1/performancediagnostics',
  '/GetADMXFile/Trusted%20Platform%20Module%20Services/machine/194/21H1/tpm',
  '/GetADMXFile/User%20Profiles/machine/195/21H1/userprofiles',
  '/GetADMXFile/Windows%20File%20Protection/machine/196/21H1/windowsfileprotection',
  '/GetADMXFile/Windows%20Time%20Service/machine/197/21H1/w32time',
  '/GetADMXFile/Time%20Providers/machine/238/21H1/w32time',
  '/GetADMXFile/Laps/machine/404/21H1/laps',
  '/GetADMXFile/Windows%20Components/machine/12/21H1/activexinstallservice',
  '/GetADMXFile/ActiveX%20Installer%20Service/machine/13/21H1/activexinstallservice',
  '/GetADMXFile/Add%20features%20to%20Windows%2010/machine/14/21H1/windowsanytimeupgrade',
  '/GetADMXFile/App%20and%20Device%20Inventory/machine/562/21H1/AppDeviceInventory',
  '/GetADMXFile/App%20Package%20Deployment/machine/15/21H1/apppackagemanager',
  '/GetADMXFile/App%20Privacy/machine/16/21H1/appprivacy',
  '/GetADMXFile/App%20Runtime/machine/17/21H1/appruntime',
  '/GetADMXFile/Application%20compatibility/machine/18/21H1/appcompat',
  '/GetADMXFile/AutoPlay%20Policies/machine/19/21H1/autoplay',
  '/GetADMXFile/Biometrics/machine/20/21H1/biometrics',
  '/GetADMXFile/BitLocker%20Drive%20Encryption/machine/21/21H1/volumeencryption',
  '/GetADMXFile/Fixed%20Data%20Drives/machine/106/21H1/volumeencryption',
  '/GetADMXFile/Operating%20System%20Drives/machine/107/21H1/volumeencryption',
  '/GetADMXFile/Removable%20Data%20Drives/machine/108/21H1/volumeencryption',
  '/GetADMXFile/Camera/machine/22/21H1/camera',
  '/GetADMXFile/Chat/machine/508/21H1/taskbar',
  '/GetADMXFile/Cloud%20Content/machine/24/21H1/cloudcontent',
  '/GetADMXFile/Connect/machine/25/21H1/wirelessdisplay',
  '/GetADMXFile/Credential%20User%20Interface/machine/26/21H1/credui',
  '/GetADMXFile/Data%20Collection%20and%20Preview%20Builds/machine/27/21H1/datacollection',
  '/GetADMXFile/Delivery%20Optimization/machine/28/21H1/deliveryoptimization',
  '/GetADMXFile/Desktop%20Gadgets/machine/30/21H1/sidebar',
  '/GetADMXFile/Desktop%20Window%20Manager/machine/31/21H1/dwm',
  '/GetADMXFile/Window%20Frame%20Coloring/machine/109/21H1/dwm',
  '/GetADMXFile/Device%20and%20Driver%20Compatibility/machine/32/21H1/devicecompat',
  '/GetADMXFile/Device%20Registration/machine/33/21H1/workplacejoin',
  '/GetADMXFile/Digital%20Locker/machine/34/21H1/digitallocker',
  '/GetADMXFile/Edge%20UI/machine/35/21H1/edgeui',
  '/GetADMXFile/Event%20Forwarding/machine/36/21H1/eventforwarding',
  '/GetADMXFile/Event%20Log%20Service/machine/37/21H1/eventlog',
  '/GetADMXFile/Application/machine/239/21H1/eventlog',
  '/GetADMXFile/Security/machine/240/21H1/eventlog',
  '/GetADMXFile/Setup/machine/241/21H1/eventlog',
  '/GetADMXFile/System/machine/242/21H1/eventlog',
  '/GetADMXFile/Event%20Logging/machine/38/21H1/eventlogging',
  '/GetADMXFile/Event%20Viewer/machine/39/21H1/eventviewer',
  '/GetADMXFile/File%20Explorer/machine/40/21H1/windowsexplorer',
  '/GetADMXFile/Previous%20Versions/machine/243/21H1/previousversions',
  '/GetADMXFile/File%20History/machine/41/21H1/filehistory',
  '/GetADMXFile/Find%20My%20Device/machine/42/21H1/findmy',
  '/GetADMXFile/Game%20Explorer/machine/517/21H1/GameExplorer',
  '/GetADMXFile/Handwriting/machine/43/21H1/handwriting',
  '/GetADMXFile/HomeGroup/machine/44/21H1/sharing',
  '/GetADMXFile/Human%20Presence/machine/509/21H1/sensors',
  '/GetADMXFile/Internet%20Explorer/machine/46/21H1/inetres',
  '/GetADMXFile/Accelerators/machine/244/21H1/inetres',
  '/GetADMXFile/Application%20Compatibility/machine/245/21H1/inetres',
  '/GetADMXFile/Clipboard%20access/machine/272/21H1/inetres',
  '/GetADMXFile/Browser%20menus/machine/246/21H1/inetres',
  '/GetADMXFile/Compatibility%20View/machine/247/21H1/inetres',
  '/GetADMXFile/Corporate%20Settings/machine/248/21H1/inetres',
  '/GetADMXFile/Code%20Download/machine/273/21H1/inetres',
  '/GetADMXFile/Delete%20Browsing%20History/machine/249/21H1/inetres',
  '/GetADMXFile/Internet%20Control%20Panel/machine/250/21H1/inetres',
  '/GetADMXFile/Advanced%20Page/machine/274/21H1/inetres',
  '/GetADMXFile/Content%20Page/machine/275/21H1/inetres',
  '/GetADMXFile/General%20Page/machine/276/21H1/inetres',
  '/GetADMXFile/Browsing%20History/machine/278/21H1/inetres',
  '/GetADMXFile/Security%20Page/machine/277/21H1/inetres',
  '/GetADMXFile/Internet%20Zone/machine/279/21H1/inetres',
  '/GetADMXFile/Intranet%20Zone/machine/280/21H1/inetres',
  '/GetADMXFile/Local%20Machine%20Zone/machine/281/21H1/inetres',
  '/GetADMXFile/Locked-Down%20Internet%20Zone/machine/282/21H1/inetres',
  '/GetADMXFile/Locked-Down%20Intranet%20Zone/machine/283/21H1/inetres',
  '/GetADMXFile/Locked-Down%20Local%20Machine%20Zone/machine/284/21H1/inetres',
  '/GetADMXFile/Locked-Down%20Restricted%20Sites%20Zone/machine/285/21H1/inetres',
  '/GetADMXFile/Locked-Down%20Trusted%20Sites%20Zone/machine/286/21H1/inetres',
  '/GetADMXFile/Restricted%20Sites%20Zone/machine/287/21H1/inetres',
  '/GetADMXFile/Trusted%20Sites%20Zone/machine/288/21H1/inetres',
  '/GetADMXFile/Internet%20Settings/machine/251/21H1/inetres',
  '/GetADMXFile/Advanced%20settings/machine/289/21H1/inetres',
  '/GetADMXFile/Browsing/machine/292/21H1/inetres',
  '/GetADMXFile/AutoComplete/machine/290/21H1/inetres',
  '/GetADMXFile/Component%20Updates/machine/291/21H1/inetres',
  '/GetADMXFile/Help%20Menu%20%3E%20About%20Internet%20Explorer/machine/295/21H1/inetres',
  '/GetADMXFile/Periodic%20check%20for%20updates%20to%20Internet%20Explorer%20and%20Internet%20Tools/machine/296/21H1/inetres',
  '/GetADMXFile/Privacy/machine/252/21H1/inetres',
  '/GetADMXFile/Security%20Features/machine/253/21H1/inetres',
  '/GetADMXFile/Add-on%20Management/machine/297/21H1/inetres',
  '/GetADMXFile/AJAX/machine/298/21H1/inetres',
  '/GetADMXFile/Binary%20behavior%20Security%20Restriction/machine/299/21H1/inetres',
  '/GetADMXFile/Consistent%20Mime%20Handling/machine/300/21H1/inetres',
  '/GetADMXFile/Local%20Machine%20Zone%20Lockdown%20Security/machine/301/21H1/inetres',
  '/GetADMXFile/Mime%20Sniffing%20Safety%20Feature/machine/302/21H1/inetres',
  '/GetADMXFile/Mk%20Protocol%20Security%20Restriction/machine/303/21H1/inetres',
  '/GetADMXFile/Network%20Protocol%20Lockdown/machine/304/21H1/inetres',
  '/GetADMXFile/Restricted%20Protocols%20Per%20Zone/machine/311/21H1/inetres',
  '/GetADMXFile/Notification%20bar/machine/305/21H1/inetres',
  '/GetADMXFile/Object%20Caching%20Protection/machine/306/21H1/inetres',
  '/GetADMXFile/Protection%20From%20Zone%20Elevation/machine/307/21H1/inetres',
  '/GetADMXFile/Restrict%20ActiveX%20Install/machine/308/21H1/inetres',
  '/GetADMXFile/Restrict%20File%20Download/machine/309/21H1/inetres',
  '/GetADMXFile/Scripted%20Window%20Security%20Restrictions/machine/310/21H1/inetres',
  '/GetADMXFile/Toolbars/machine/254/21H1/inetres',
    
  // {
  //   path: '/api/get-with-body',
  //   payload: {
  //     filter: 'active',
  //     limit: 10
  //   }
  // },
];
 
// Auto-generate GET endpoint objects with names derived from paths
const getEndpoints = getApiList.map(item => {
  // Handle both string paths and objects with payloads
  let path = typeof item === 'string' ? item : item.path;
  let payload = typeof item === 'string' ? null : item.payload;
  let name = path.split('/').pop().split('?')[0].replace(/[^a-zA-Z0-9_]/g, '_');
  return { name, path, payload, method: 'GET' };
});
 
// ================== POST API'S ==================
// Define POST API endpoints with their payloads
// Format: { path: '/api/endpoint', payload: { key: value } }
const postEndpoints = [
 
 
  
 
  // Example POST APIs - add your POST endpoints here
  // {
  //   path: '/api/example-post-endpoint',
  //   payload: {
  //     key1: 'value1',
  //     key2: 'value2'
  //   }
  // },
  // {
  //   path: '/api/another-post-endpoint',
  //   payload: {
  //     email: 'superadmin@zerotouch.ai',
  //     data: { nested: 'value' }
  //   }
  // },
].map(ep => {
  let name = ep.path.split('/').pop().split('?')[0].replace(/[^a-zA-Z0-9_]/g, '_');
  return { name, path: ep.path, payload: ep.payload, method: 'POST' };
});
 
// Combine all endpoints for iteration count
const allEndpoints = [...getEndpoints, ...postEndpoints];
 
// Create custom metrics for GET endpoints
const getDurations = {};
const getStatusCodes = {};
 
for (let ep of getEndpoints) {
  getDurations[ep.name] = new Trend(`get_duration_${ep.name}`);
  getStatusCodes[ep.name] = new Gauge(`get_status_${ep.name}`);
}
 
// Create custom metrics for POST endpoints
const postDurations = {};
const postStatusCodes = {};
 
for (let ep of postEndpoints) {
  postDurations[ep.name] = new Trend(`post_duration_${ep.name}`);
  postStatusCodes[ep.name] = new Gauge(`post_status_${ep.name}`);
}
 
// Options based on total endpoints
export let options = {
  vus: 1,
  iterations: allEndpoints.length,
};
 
export default function () {
  let headers = {
    Authorization: `Bearer ${config.bearerToken}`,
  };
 
  // Pick one endpoint per iteration
  let ep = allEndpoints[__ITER % allEndpoints.length];
  let url = `${config.baseUrl}${ep.path}`;
  let res;
 
  if (ep.method === 'GET') {
    // GET Request (with or without payload)
    if (ep.payload) {
      // GET with payload/body - use http.request for body support
      let getHeaders = {
        ...headers,
        'Content-Type': 'application/json',
      };
      res = http.request('GET', url, JSON.stringify(ep.payload), { headers: getHeaders });
    } else {
      // Simple GET without payload
      res = http.get(url, { headers });
    }
   
    // Record custom metrics for GET
    getDurations[ep.name].add(res.timings.duration);
    getStatusCodes[ep.name].add(res.status);
  } else {
    // POST Request
    let postHeaders = {
      ...headers,
      'Content-Type': 'application/json',
    };
   
    res = http.post(url, JSON.stringify(ep.payload), { headers: postHeaders });
   
    // Record custom metrics for POST
    postDurations[ep.name].add(res.timings.duration);
    postStatusCodes[ep.name].add(res.status);
  }
 
  // Log result
  console.log(`[${ep.method}] ${ep.name}: Status ${res.status}, Duration ${res.timings.duration.toFixed(2)}ms`);
 
  // Check for 200 OK
  check(res, {
    [`${ep.name} status is 200`]: (r) => r.status === 200,
  });
}
 
// Custom CSV export at the end of the test
export function handleSummary(data) {
  let csv = '';
 
  // ===== GET API's Section =====
  csv += '========== GET APIs ==========\n';
  csv += 'API,URL,StatusCode,Duration(ms)\n';
 
  for (let ep of getEndpoints) {
    let durationKey = `get_duration_${ep.name}`;
    let statusKey = `get_status_${ep.name}`;
 
    let avgDuration = data.metrics[durationKey]?.values?.avg?.toFixed(2) || 'N/A';
    let statusCode = data.metrics[statusKey]?.values?.value || 'N/A';
    let fullUrl = `${config.baseUrl}${ep.path}`;
 
    csv += `${ep.name},${fullUrl},${statusCode},${avgDuration}\n`;
  }
 
  // ===== POST API's Section =====
  csv += '\n========== POST APIs ==========\n';
  csv += 'API,URL,StatusCode,Duration(ms)\n';
 
  for (let ep of postEndpoints) {
    let durationKey = `post_duration_${ep.name}`;
    let statusKey = `post_status_${ep.name}`;
 
    let avgDuration = data.metrics[durationKey]?.values?.avg?.toFixed(2) || 'N/A';
    let statusCode = data.metrics[statusKey]?.values?.value || 'N/A';
    let fullUrl = `${config.baseUrl}${ep.path}`;
 
    csv += `${ep.name},${fullUrl},${statusCode},${avgDuration}\n`;
  }
 
  // Use timestamp to avoid file lock issues
  let timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
 
  return {
    [`results_${timestamp}.csv`]: csv,
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
 
// Simple text summary helper
function textSummary(data, opts) {
  let output = '\n=== Test Summary ===\n\n';
 
  // GET APIs Summary
  output += '--- GET APIs ---\n';
  for (let ep of getEndpoints) {
    let durationKey = `get_duration_${ep.name}`;
    let statusKey = `get_status_${ep.name}`;
 
    let avgDuration = data.metrics[durationKey]?.values?.avg?.toFixed(2) || 'N/A';
    let statusCode = data.metrics[statusKey]?.values?.value || 'N/A';
    let icon = statusCode === 200 ? '✓' : '✗';
 
    output += `${icon} [GET] ${ep.name}: Status ${statusCode}, Duration ${avgDuration}ms\n`;
  }
 
  // POST APIs Summary
  output += '\n--- POST APIs ---\n';
  for (let ep of postEndpoints) {
    let durationKey = `post_duration_${ep.name}`;
    let statusKey = `post_status_${ep.name}`;
 
    let avgDuration = data.metrics[durationKey]?.values?.avg?.toFixed(2) || 'N/A';
    let statusCode = data.metrics[statusKey]?.values?.value || 'N/A';
    let icon = statusCode === 200 ? '✓' : '✗';
 
    output += `${icon} [POST] ${ep.name}: Status ${statusCode}, Duration ${avgDuration}ms\n`;
  }
 
  return output;
}
