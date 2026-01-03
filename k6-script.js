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
  '/api/ADDMNewCollectionMembers/1/9',
  '/GetPoliciesByLevels/Windows_11_Enterprise_Benchmark_v3/all',
  '/GetPoliciesByLevels/Windows_11_Enterprise_Benchmark_v3/L1',
  '/GetPoliciesByLevels/Windows_11_Enterprise_Benchmark_v3/L2',
  '/GetPoliciesByLevels/Windows_11_Enterprise_Benchmark_v3/BL',
  '/GetADMXByID/Windows_11_Enterprise_Benchmark_v3/18.6.10.2',
  '/api/ADGroups/GetZTGroups?q=&page=1&adids=&deviceids=&companyids=&groupType=',
  '/api/ADMXpolicy/CreateCISBenchmark',
  '/GetGroupAppsStatus/0',
  
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
  // IMPORTANT: This is POST API
  // API Name: /api/GetADMXCollectionListServer/admxpolicy
  {
    path: '/api/GetADMXCollectionListServer/admxpolicy',
    payload: {
      draw: 1,
      columns: [
        {
          data: null,
          name: '',
          searchable: true,
          orderable: false,
          search: { value: '', regex: false },
        },
      ],
      order: [{ column: 3, dir: 'asc', columnName: 'cp_id' }],
      length: 25,
      search: { value: '', regex: false },
      createdByEmail: 'zautuh@zerotouch.ai',
      createdById: 'e5160f84-ddb7-4c7c-ba38-738d471da634',
    },
  },
 
  // IMPORTANT: This is POST API
  // API Name: /api/GetMembersListData/1
  {
    path: '/api/GetMembersListData/1',
    payload: {
      draw: 1,
      columns: [
        {
          data: null,
          name: '',
          searchable: true,
          orderable: false,
          search: { value: '', regex: false },
        },
      ],
      order: [{ column: 3, dir: 'asc', columnName: 'cp_id' }],
      length: 25,
      search: { value: '', regex: false },
      createdByEmail: 'zautuh@zerotouch.ai',
      createdById: 'e5160f84-ddb7-4c7c-ba38-738d471da634',
    },
  },
 
  // IMPORTANT: This is POST API
  // API Name: /api/GetMembersNewDataData/1/1
  {
    path: '/api/GetMembersNewDataData/1/1',
    payload: {
      draw: 1,
      columns: [
        {
          data: null,
          name: '',
          searchable: true,
          orderable: false,
          search: { value: '', regex: false },
        },
      ],
      order: [{ column: 3, dir: 'asc', columnName: 'cp_id' }],
      length: 25,
      search: { value: '', regex: false },
      createdByEmail: 'zautuh@zerotouch.ai',
      createdById: 'e5160f84-ddb7-4c7c-ba38-738d471da634',
    },
  },
 
  // IMPORTANT: This is POST API
  // API Name: /ADMXpolicy/api/GetADMXDetailsById/4
  // NOTE: Provided payload was multipart/form-data and not extractable into JSON here.
  // Keep placeholder payload until you provide/extract a JSON body (or we update request logic to send multipart).
  {
    path: '/ADMXpolicy/api/GetADMXDetailsById/4',
    payload: {
      __payloadNotExtracted: true,
    },
  },
 
  // IMPORTANT: This is POST API
  // API Name: /api/ADMXPolicy/GetCISCollectionListServer/cisbenchmark
  {
    path: '/api/ADMXPolicy/GetCISCollectionListServer/cisbenchmark',
    payload: {
      draw: 1,
      columns: [
        {
          data: null,
          name: '',
          searchable: true,
          orderable: false,
          search: { value: '', regex: false },
        },
      ],
      order: [{ column: 3, dir: 'asc', columnName: 'cp_id' }],
      length: 25,
      search: { value: '', regex: false },
      createdByEmail: 'zautuh@zerotouch.ai',
      createdById: 'e5160f84-ddb7-4c7c-ba38-738d471da634',
    },
  },
 
  // IMPORTANT: This is POST API
  // API Name: /api/ADMXPolicy/UpdateGroupSettings
  {
    path: '/api/ADMXPolicy/UpdateGroupSettings',
    payload: {
      id: 9,
      clientAppId: 9,
      name: 'Collection_NVC',
      isAutoPackage: false,
      isForceInstall: false,
      isUninstallSoftwareCenter: false,
      isGroups: true,
      type: 'cisbenchmark',
      previousGroup: '',
      assignmentGroupdata: '',
      selectedCustomer: 1,
      companyIds: '',
      groupType: '',
      installExclude: [],
      softwareCenterAssign: [],
      softwareCenterExclude: [],
      uninstallAll: false,
      createdByEmail: 'zautuh@zerotouch.ai',
      createdById: 'e5160f84-ddb7-4c7c-ba38-738d471da634',
    },
  },
 
  // IMPORTANT: This is POST API
  // API Name: /api/DriverPolicy/CreateDriverPolicies
  {
    path: '/api/DriverPolicy/CreateDriverPolicies',
    payload: {
      id: 0,
      name: 'NVC123',
      action: '',
      manufacture: 'Lenovo',
      severity: 'optional',
      isSoftwareCenter: false,
      categoryList: ['USB Audio'],
      updateTypeList: [1],
      severityList: ['optional'],
      scheduleType: 'onetime',
      date: '2026-01-13',
      time: '21:45',
      audit: 1,
      previousgroups: '',
      assignmentgroupdata: '',
      selectedGroupsData: '',
      createdByEmail: 'zautuh@zerotouch.ai',
      createdById: 'e5160f84-ddb7-4c7c-ba38-738d471da634',
    },
  },
 
  // IMPORTANT: This is POST API
  // API Name: /api/DriverPolicy/EditDriverPolicy?Id=2
  // NOTE: Payload extract was: Id=2
  {
    path: '/api/DriverPolicy/EditDriverPolicy?Id=2',
    payload: { Id: 2 },
  },
 
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
