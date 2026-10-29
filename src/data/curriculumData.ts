/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Tiny DC Cyber Academy - Master Curriculum & 35 Track Catalog
 */

import { Track } from '../types/academy.ts';

export const TRACKS: Track[] = [
  // 1. Python (Core)
  {
    id: 'python',
    title: 'Python for Systems & AI',
    slug: 'python',
    tagline: 'Write scripts, automate infrastructure, process datasets, and build AI applications.',
    category: 'Programming Languages',
    executionEngine: 'javascript', // evaluated via sandbox runner
    status: 'Complete',
    icon: 'Terminal',
    color: 'emerald',
    description: 'Master Python from fundamentals to systems automation, data manipulation, APIs, and AI inference pipelines.',
    careerFocus: 'AI Engineer / Systems Automator / Backend Developer',
    prerequisites: [],
    estimatedHours: 24,
    lessons: [
      {
        id: 'py-01',
        trackId: 'python',
        title: 'Python Syntax & Variables: The System Configurator',
        order: 1,
        difficulty: 'beginner',
        estimatedMinutes: 20,
        prerequisites: [],
        briefing: 'Welcome to Python. You will initialize variables representing server specs and compute memory limits.',
        objectives: [
          'Declare dynamic typed variables in Python',
          'Perform arithmetic calculations on gigabytes and megabytes',
          'Format system status output cleanly',
        ],
        conceptExplanation: 'Python variables are references to objects stored in memory. Unlike static languages, you do not declare types explicitly. Python manages memory automatically with reference counting and garbage collection.',
        realWorldAnalogy: 'Think of variables as tagged labels attached to storage boxes in your server room. Changing a variable simply moves the label to a new box.',
        demonstrationCode: `# Calculate remaining server memory
total_ram_gb = 64
os_reserved_gb = 4
worker_count = 6

available_for_workers = total_ram_gb - os_reserved_gb
ram_per_worker = available_for_workers / worker_count
print(f"Allocating {ram_per_worker:.2f} GB RAM per worker process")`,
        demonstrationExplanation: 'We assign numeric literals to variables, calculate available RAM by subtracting the OS overhead, and partition the remainder evenly across 6 workers using formatted string literals (f-strings).',
        guidedExercisePrompt: 'Write a function `solution(total_ram, reserved, workers)` that returns the allocated RAM per worker as a number rounded to 2 decimal places.',
        starterCode: `function solution(total_ram, reserved, workers) {
  // Return allocated RAM per worker: (total_ram - reserved) / workers
  const available = total_ram - reserved;
  return Number((available / workers).toFixed(2));
}`,
        solutionCode: `function solution(total_ram, reserved, workers) {
  const available = total_ram - reserved;
  return Number((available / workers).toFixed(2));
}`,
        testCases: [
          { id: 'tc-py-1', description: '64GB total, 4GB reserved, 6 workers', input: 'solution(64, 4, 6)', expectedOutput: 10 },
          { id: 'tc-py-2', description: '128GB total, 8GB reserved, 4 workers', input: 'solution(128, 8, 4)', expectedOutput: 30 },
          { id: 'tc-py-3', description: '16GB total, 2GB reserved, 3 workers', input: 'solution(16, 2, 3)', expectedOutput: 4.67 },
        ],
        troubleshootingTips: [
          'Ensure you handle division by checking workers is greater than zero.',
          'Floating point math like 14/3 produces repeating decimals; always use formatting or rounding.',
        ],
        knowledgeCheck: [
          {
            question: 'What happens in Python when you assign a variable to another variable (e.g. b = a)?',
            options: [
              'A completely separate deep copy is created',
              'Both variables point to the exact same object in memory',
              'Python crashes with a reference error',
              'The first variable is automatically deleted',
            ],
            correctIndex: 1,
            explanation: 'In Python, assignment binds a name to an object. Both variables reference the same memory address until reassigned.',
          },
        ],
        debrief: 'You successfully wrote memory allocation logic and formatted operational server parameters.',
        realWorldApplication: 'Kubernetes and Slurm schedulers use identical memory reservation equations to assign pod limits.',
      },
      {
        id: 'py-02',
        trackId: 'python',
        title: 'Lists, Dictionaries & JSON: Parsing Server Telemetry',
        order: 2,
        difficulty: 'beginner',
        estimatedMinutes: 25,
        prerequisites: ['py-01'],
        briefing: 'Learn to filter and transform dictionary arrays representing datacenter server telemetry.',
        objectives: [
          'Iterate through collections of server status records',
          'Filter unhealthy nodes by CPU threshold',
          'Aggregate average utilization metrics',
        ],
        conceptExplanation: 'Python dictionaries map unique keys to values with O(1) average lookup time. Lists store ordered sequences. Together, they form the standard representation of JSON data in web APIs and server agents.',
        realWorldAnalogy: 'A dictionary is like an equipment rack inventory manifest where every server asset tag instantly reveals its serial number, IP address, and status.',
        demonstrationCode: `nodes = [
    {"name": "worker-01", "cpu": 45, "healthy": True},
    {"name": "worker-02", "cpu": 92, "healthy": False},
    {"name": "worker-03", "cpu": 31, "healthy": True}
]
critical_nodes = [n["name"] for n in nodes if n["cpu"] > 80 or not n["healthy"]]
print("Alerting on nodes:", critical_nodes)`,
        demonstrationExplanation: 'We use list comprehensions to filter nodes that have high CPU or an unhealthy flag, producing a targeted alert list.',
        guidedExercisePrompt: 'Write a function `solution(nodes)` that accepts an array of node objects `{ name, cpu, healthy }` and returns an array of names of nodes that need attention (cpu > 80 or healthy === false).',
        starterCode: `function solution(nodes) {
  return nodes
    .filter(n => n.cpu > 80 || !n.healthy)
    .map(n => n.name);
}`,
        solutionCode: `function solution(nodes) {
  return nodes
    .filter(n => n.cpu > 80 || !n.healthy)
    .map(n => n.name);
}`,
        testCases: [
          {
            id: 'tc-py2-1',
            description: 'Identifies overloaded worker-02',
            input: 'solution([{name: "w1", cpu: 40, healthy: true}, {name: "w2", cpu: 95, healthy: true}])',
            expectedOutput: '["w2"]',
          },
        ],
        troubleshootingTips: ['Remember to check both cpu and healthy status.'],
        knowledgeCheck: [
          {
            question: 'What is the average time complexity to look up a key in a Python dictionary?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
            correctIndex: 2,
            explanation: 'Python dictionaries are implemented using hash tables, offering constant-time O(1) lookups on average.',
          },
        ],
        debrief: 'Telemetry parsing is the bedrock of SRE monitoring agents and Prometheus exporters.',
        realWorldApplication: 'Datadog and Prometheus node-exporters parse telemetry in exact key-value dictionaries.',
      },
    ],
  },

  // 2. JavaScript (Core)
  {
    id: 'javascript',
    title: 'Modern JavaScript (ES2024)',
    slug: 'javascript',
    tagline: 'Asynchronous event loops, DOM manipulation, promises, and Node.js microservices.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'Code2',
    color: 'yellow',
    description: 'Master JavaScript runtime mechanics, closures, the V8 event loop, async/await, and microservices.',
    careerFocus: 'Full-Stack Developer / Node.js Systems Engineer',
    prerequisites: [],
    estimatedHours: 20,
    lessons: [
      {
        id: 'js-01',
        trackId: 'javascript',
        title: 'Asynchronous Event Loop & Retry Handlers',
        order: 1,
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        prerequisites: [],
        briefing: 'Construct an exponential backoff retry mechanism for network requests to a flaky server endpoint.',
        objectives: [
          'Understand asynchronous promises and call stacks',
          'Implement exponential backoff calculation (delay * 2^attempt)',
          'Prevent cascading failures with jitter',
        ],
        conceptExplanation: 'JavaScript is single-threaded with an event loop that coordinates microtasks (Promises) and macrotasks (timers, I/O). When communicating with distributed servers, network failures are inevitable; automated exponential backoff prevents pounding struggling servers.',
        realWorldAnalogy: 'If someone is on a busy phone line, you do not redial every second; you wait 2 seconds, then 4 seconds, then 8 seconds.',
        demonstrationCode: `function calculateBackoff(baseDelayMs, attempt, maxDelayMs = 10000) {
  const exponential = baseDelayMs * Math.pow(2, attempt);
  return Math.min(exponential, maxDelayMs);
}`,
        demonstrationExplanation: 'We calculate delay using 2 to the power of attempt count, capping the result at maxDelayMs.',
        guidedExercisePrompt: 'Implement `solution(baseDelay, attempt, maxDelay)` returning the backoff delay in ms.',
        starterCode: `function solution(baseDelay, attempt, maxDelay) {
  const delay = baseDelay * Math.pow(2, attempt);
  return Math.min(delay, maxDelay);
}`,
        solutionCode: `function solution(baseDelay, attempt, maxDelay) {
  const delay = baseDelay * Math.pow(2, attempt);
  return Math.min(delay, maxDelay);
}`,
        testCases: [
          { id: 'tc-js-1', description: 'Attempt 0 with 100ms base', input: 'solution(100, 0, 5000)', expectedOutput: 100 },
          { id: 'tc-js-2', description: 'Attempt 3 with 100ms base', input: 'solution(100, 3, 5000)', expectedOutput: 800 },
          { id: 'tc-js-3', description: 'Caps at maxDelay', input: 'solution(100, 8, 5000)', expectedOutput: 5000 },
        ],
        troubleshootingTips: ['Ensure Math.pow(2, 0) equals 1.'],
        knowledgeCheck: [
          {
            question: 'Which queue in JavaScript executes first when the call stack clears?',
            options: ['Macrotask queue (setTimeout)', 'Microtask queue (Promise.then)', 'RequestAnimationFrame', 'Idle callback'],
            correctIndex: 1,
            explanation: 'The microtask queue has strict priority over the macrotask queue. All resolved Promise microtasks drain before the next macrotask is processed.',
          },
        ],
        debrief: 'Resilient network retries protect infrastructure during traffic spikes and service restarts.',
        realWorldApplication: 'AWS SDK and Stripe client libraries use this exact exponential backoff formula for resilient API calls.',
      },
    ],
  },

  // 3. TypeScript (Core)
  {
    id: 'typescript',
    title: 'TypeScript Systems Architecture',
    slug: 'typescript',
    tagline: 'Static typing, generics, union discriminating types, and bulletproof API contracts.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'ShieldCheck',
    color: 'blue',
    description: 'Learn strict types, generics, discriminated unions, and compiler validation for enterprise scale.',
    careerFocus: 'Enterprise Architect / Senior Frontend Engineer',
    prerequisites: ['javascript'],
    estimatedHours: 18,
    lessons: [
      {
        id: 'ts-01',
        trackId: 'typescript',
        title: 'Discriminated Unions & Exhaustive Type Narrowing',
        order: 1,
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        prerequisites: [],
        briefing: 'Model server events (Heartbeat, Alert, Outage) with type-safe discriminated union handlers.',
        objectives: [
          'Create discriminated unions with a common discriminator field',
          'Use switch/case type narrowing',
          'Ensure exhaustive compile-time checking',
        ],
        conceptExplanation: 'Discriminated unions combine a literal tag (like type: "alert") with payload types. The compiler narrows types in each branch of your code, making impossible states unrepresentable.',
        realWorldAnalogy: 'Emergency sirens have distinct tones (tornado, fire, lockdown). You never guess the protocol; the signal type dictates the exact emergency procedure.',
        demonstrationCode: `type ServerEvent = 
  | { type: 'heartbeat'; timestamp: number }
  | { type: 'alert'; severity: 'WARN' | 'CRIT'; code: number }
  | { type: 'reboot'; initiator: string };

function formatEvent(event: ServerEvent): string {
  switch (event.type) {
    case 'heartbeat': return \`Ping at \${event.timestamp}\`;
    case 'alert': return \`[\${event.severity}] Error \${event.code}\`;
    case 'reboot': return \`Rebooted by \${event.initiator}\`;
  }
}`,
        demonstrationExplanation: 'Inside each case block, TypeScript knows the exact shape of event without needing explicit casting.',
        guidedExercisePrompt: 'Implement `solution(event)` that returns a summary string: for type "heartbeat" -> "OK", for type "alert" -> "ALERT: {code}", for type "reboot" -> "REBOOT: {initiator}".',
        starterCode: `function solution(event) {
  switch (event.type) {
    case 'heartbeat': return 'OK';
    case 'alert': return 'ALERT: ' + event.code;
    case 'reboot': return 'REBOOT: ' + event.initiator;
    default: return 'UNKNOWN';
  }
}`,
        solutionCode: `function solution(event) {
  switch (event.type) {
    case 'heartbeat': return 'OK';
    case 'alert': return 'ALERT: ' + event.code;
    case 'reboot': return 'REBOOT: ' + event.initiator;
    default: return 'UNKNOWN';
  }
}`,
        testCases: [
          { id: 'tc-ts-1', description: 'Handles heartbeat', input: 'solution({type: "heartbeat", timestamp: 123})', expectedOutput: 'OK' },
          { id: 'tc-ts-2', description: 'Handles alert', input: 'solution({type: "alert", code: 504})', expectedOutput: 'ALERT: 504' },
          { id: 'tc-ts-3', description: 'Handles reboot', input: 'solution({type: "reboot", initiator: "admin"})', expectedOutput: 'REBOOT: admin' },
        ],
        troubleshootingTips: ['Verify property names match the event object.'],
        knowledgeCheck: [
          {
            question: 'What is the primary benefit of a discriminated union over a loose object with optional properties?',
            options: [
              'Faster runtime execution speed',
              'The compiler guarantees that properties belonging only to one state cannot be accessed in another',
              'It automatically connects to the database',
              'It makes files smaller on disk',
            ],
            correctIndex: 1,
            explanation: 'Discriminated unions prevent invalid states by strictly coupling properties to their state discriminator at compile time.',
          },
        ],
        debrief: 'Type narrowing eliminates entire categories of runtime undefined errors in production.',
        realWorldApplication: 'Redux reducers, WebSocket protocols, and IPC message buses rely extensively on discriminated unions.',
      },
    ],
  },

  // 4. HTML & CSS (Core)
  {
    id: 'html-css',
    title: 'HTML & Modern CSS Architecture',
    slug: 'html-css',
    tagline: 'Semantic HTML5, CSS Flexbox/Grid, zero-pill design, and responsive viewport interfaces.',
    category: 'Markup & Configuration',
    executionEngine: 'html-css',
    status: 'Complete',
    icon: 'Layout',
    color: 'orange',
    description: 'Construct semantic web structures, cyber dashboards, responsive CSS grid layouts, and accessible interfaces.',
    careerFocus: 'Frontend Engineer / UI/UX Systems Designer',
    prerequisites: [],
    estimatedHours: 15,
    lessons: [
      {
        id: 'html-01',
        trackId: 'html-css',
        title: 'Semantic HTML5 & Accessible Cyber Dashboards',
        order: 1,
        difficulty: 'beginner',
        estimatedMinutes: 20,
        prerequisites: [],
        briefing: 'Construct an accessible server rack status card using semantic HTML tags without generic div soups.',
        objectives: [
          'Use semantic tags: <main>, <section>, <header>, <meter>, <status>',
          'Apply ARIA labels for screen reader accessibility',
          'Style with high-contrast cyber telemetry aesthetics',
        ],
        conceptExplanation: 'Semantic HTML gives meaning to content. Search engines, screen readers, and automated accessibility tools rely on tags like <header>, <article>, and <dl> to structure information correctly.',
        realWorldAnalogy: 'Think of blueprint symbols: an architect does not draw generic rectangles for doors, windows, and fuse boxes; each symbol communicates distinct structural function.',
        demonstrationCode: `<section aria-labelledby="rack-heading" class="rack-card">
  <header>
    <h2 id="rack-heading">Rack A-04 (Compute Cluster)</h2>
    <span class="status-indicator" role="status" aria-label="Status: Operational"></span>
  </header>
  <dl>
    <dt>Total Nodes</dt>
    <dd>16 Units</dd>
    <dt>Load Average</dt>
    <dd>42%</dd>
  </dl>
</section>`,
        demonstrationExplanation: 'We use <section> with aria-labelledby linked to the <h2> heading, and a description list <dl> for key-value telemetry pairs.',
        guidedExercisePrompt: 'Construct a semantic HTML snippet with a `<section>` container, a `<h2>` heading with text "Node Status", and a `<p>` element with text "Online".',
        starterCode: `<section class="cyber-panel p-4 bg-slate-900 border border-emerald-500/30 rounded">
  <h2 class="text-emerald-400 font-bold font-mono">Node Status</h2>
  <p class="text-slate-300 font-mono mt-1">Online</p>
</section>`,
        solutionCode: `<section class="cyber-panel p-4 bg-slate-900 border border-emerald-500/30 rounded">
  <h2 class="text-emerald-400 font-bold font-mono">Node Status</h2>
  <p class="text-slate-300 font-mono mt-1">Online</p>
</section>`,
        testCases: [
          { id: 'tc-h-1', description: 'Contains h2 with Node Status', input: null, expectedOutput: 'true' },
        ],
        troubleshootingTips: ['Keep tag pairs properly closed.'],
        knowledgeCheck: [
          {
            question: 'Why is `<dl>` preferred over arbitrary `<div>` pairs for server specs (e.g. CPU: 64 Cores)?',
            options: [
              'It loads faster in WebKit',
              'It defines an explicit key-value association understood by assistive technologies',
              'It adds green styling by default',
              'It runs on the server',
            ],
            correctIndex: 1,
            explanation: '<dl>, <dt> (definition term), and <dd> (definition description) explicitly associate keys with their values for semantic parsing.',
          },
        ],
        debrief: 'Semantic structure ensures cyber control interfaces are robust and universally accessible.',
        realWorldApplication: 'Modern cloud consoles (AWS, GCP, Azure) enforce semantic HTML to maintain WCAG 2.1 AA accessibility compliance.',
      },
    ],
  },

  // 5. SQL (Core)
  {
    id: 'sql',
    title: 'SQL & Relational Data Engineering',
    slug: 'sql',
    tagline: 'Querying, joins, indexing, transactions, aggregations, and database performance tuning.',
    category: 'Data & Query Languages',
    executionEngine: 'sql',
    status: 'Complete',
    icon: 'Database',
    color: 'emerald',
    description: 'Master relational databases, complex joins, subqueries, schema indexing, and ACID transactions.',
    careerFocus: 'Database Administrator / Data Engineer / Backend Specialist',
    prerequisites: [],
    estimatedHours: 20,
    lessons: [
      {
        id: 'sql-01',
        trackId: 'sql',
        title: 'SELECT, WHERE & Filtering Operational Data',
        order: 1,
        difficulty: 'beginner',
        estimatedMinutes: 25,
        prerequisites: [],
        briefing: 'Query the Tiny DC server registry to locate all nodes in Rack A that are currently online.',
        objectives: [
          'Formulate structured SELECT statements',
          'Filter rows using WHERE with AND/OR logic',
          'Sort results with ORDER BY and limit return counts',
        ],
        conceptExplanation: 'SQL (Structured Query Language) is declarative: you describe WHAT data you want, and the query planner decides HOW to retrieve it using indexes and table scans.',
        realWorldAnalogy: 'Imagine asking a warehouse foreman: "Fetch all boxes on Shelf A marked Fragile." You do not specify which forklift route to take.',
        demonstrationCode: `SELECT hostname, ip, cpu_cores, ram_gb 
FROM datacenter_servers 
WHERE rack = 'Rack A' AND status = 'online'
ORDER BY ram_gb DESC;`,
        demonstrationExplanation: 'This query filters datacenter_servers for rows matching both criteria, projecting 4 specific columns sorted by RAM.',
        guidedExercisePrompt: 'Write a SQL query to retrieve all servers where `status = "online"` ordered by `hostname ASC`.',
        starterCode: `SELECT hostname, ip, status FROM datacenter_servers WHERE status = 'online' ORDER BY hostname ASC;`,
        solutionCode: `SELECT hostname, ip, status FROM datacenter_servers WHERE status = 'online' ORDER BY hostname ASC;`,
        testCases: [
          { id: 'tc-sql-1', description: 'Returns online servers in order', input: null, expectedOutput: 'srv-db-01' },
        ],
        troubleshootingTips: ['String literals in SQL use single quotes, e.g. status = \'online\'.'],
        knowledgeCheck: [
          {
            question: 'What happens when a query executes a WHERE clause on an unindexed column in a 10-million row table?',
            options: [
              'The query fails immediately with a syntax error',
              'The database performs a sequential full table scan, checking every single row from disk',
              'The query returns cached results from memory',
              'The column is automatically converted to an index',
            ],
            correctIndex: 1,
            explanation: 'Without an index (B-Tree or Hash), the database engine must inspect every row in storage, degrading query performance from milliseconds to seconds.',
          },
        ],
        debrief: 'Declarative querying allows rapid extraction of operational telemetry from relational repositories.',
        realWorldApplication: 'PostgreSQL and MySQL power the persistent registries for Kubernetes metadata and enterprise CMDBs.',
      },
    ],
  },

  // 6. Bash & Shell (Core)
  {
    id: 'bash',
    title: 'Bash & Shell Scripting Mastery',
    slug: 'bash',
    tagline: 'Terminal pipelines, streams, exit codes, process management, and infrastructure automation.',
    category: 'Scripting & Shell',
    executionEngine: 'bash',
    status: 'Complete',
    icon: 'TerminalSquare',
    color: 'emerald',
    description: 'Learn Unix command-line philosophy, stdin/stdout redirection, pipes, AWK, grep, and cron automation.',
    careerFocus: 'Linux Systems Administrator / Site Reliability Engineer',
    prerequisites: [],
    estimatedHours: 22,
    lessons: [
      {
        id: 'bash-01',
        trackId: 'bash',
        title: 'Standard Streams, Redirection & Pipelines',
        order: 1,
        difficulty: 'beginner',
        estimatedMinutes: 25,
        prerequisites: [],
        briefing: 'Filter authentication security logs to detect successful SSH connections using pipes and grep.',
        objectives: [
          'Understand stdin (0), stdout (1), and stderr (2)',
          'Chain commands using the Unix pipe operator (|)',
          'Redirect command outputs to files using > and >>',
        ],
        conceptExplanation: 'The Unix philosophy: Write programs that do one thing well. Write programs to work together. Write programs to handle text streams. Pipes connect the stdout of one program to the stdin of another in memory without touching disk.',
        realWorldAnalogy: 'Think of an industrial conveyor belt: raw parts roll past Station 1 (cat), get stamped by Station 2 (grep), and sorted into bins at Station 3 (wc).',
        demonstrationCode: `# Inspect recent SSH logins
cat /var/log/auth.log | grep "Accepted publickey" | awk '{print $9, $11}'`,
        demonstrationExplanation: 'cat streams the file, grep filters lines matching the phrase, and awk prints the username and IP address columns.',
        guidedExercisePrompt: 'Execute a pipe command that reads `/var/log/auth.log` and filters for lines containing `Accepted`.',
        starterCode: `cat /var/log/auth.log | grep Accepted`,
        solutionCode: `cat /var/log/auth.log | grep Accepted`,
        testCases: [
          { id: 'tc-b-1', description: 'Outputs accepted public key line', input: null, expectedOutput: 'Accepted publickey' },
        ],
        troubleshootingTips: ['Use quotes around search terms with spaces.'],
        knowledgeCheck: [
          {
            question: 'What is the file descriptor number for standard error (stderr) in Linux?',
            options: ['0', '1', '2', '3'],
            correctIndex: 2,
            explanation: '0 is stdin, 1 is stdout, and 2 is stderr.',
          },
        ],
        debrief: 'Pipelines enable immediate forensic analysis of gigabytes of log telemetry without custom software.',
        realWorldApplication: 'SRE incident responders use bash one-liners to triage server crashes in live terminal sessions.',
      },
    ],
  },

  // 7. PowerShell (Core)
  {
    id: 'powershell',
    title: 'PowerShell Automation & Windows Admin',
    slug: 'powershell',
    tagline: 'Object-oriented shell, pipeline objects, WMI/CIM, and Active Directory administration.',
    category: 'Scripting & Shell',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'Terminal',
    color: 'blue',
    description: 'Administer Windows Server, hypervisors, and Azure infrastructure using PowerShell object pipelines.',
    careerFocus: 'Windows Systems Engineer / Cloud Infrastructure Admin',
    prerequisites: [],
    estimatedHours: 18,
    lessons: [
      {
        id: 'ps-01',
        trackId: 'powershell',
        title: 'PowerShell Object Pipelines: Beyond Plain Text',
        order: 1,
        difficulty: 'beginner',
        estimatedMinutes: 20,
        prerequisites: [],
        briefing: 'Understand how PowerShell passes rich .NET objects rather than plain text strings through pipelines.',
        objectives: [
          'Understand Cmdlet verb-noun naming conventions (Get-Service, Stop-Process)',
          'Filter objects by property using Where-Object',
          'Select and format table output',
        ],
        conceptExplanation: 'Unlike Unix shells that pass byte streams of text requiring sed/awk parsing, PowerShell cmdlets pass structured objects. When you pipe Get-Service to Where-Object, you can directly inspect properties like .Status or .StartType.',
        realWorldAnalogy: 'Instead of receiving a printed sheet of paper where you have to count characters, you receive a physical USB drive containing the raw spreadsheet file.',
        demonstrationCode: `# Query stopped automatic services
Get-Service | Where-Object { $_.StartType -eq 'Automatic' -and $_.Status -eq 'Stopped' } | Select-Object Name, DisplayName`,
        demonstrationExplanation: 'Where-Object uses the pipeline variable $_ to inspect StartType and Status properties directly.',
        guidedExercisePrompt: 'Simulate a PowerShell query that returns services filtered by status "Stopped".',
        starterCode: `function solution(services) {
  return services.filter(s => s.status === 'Stopped').map(s => s.name);
}`,
        solutionCode: `function solution(services) {
  return services.filter(s => s.status === 'Stopped').map(s => s.name);
}`,
        testCases: [
          { id: 'tc-ps-1', description: 'Filters stopped services', input: 'solution([{name: "wuauserv", status: "Stopped"}, {name: "lanmanworkstation", status: "Running"}])', expectedOutput: '["wuauserv"]' },
        ],
        troubleshootingTips: ['Check that property names match the object specification.'],
        knowledgeCheck: [
          {
            question: 'What does the variable `$_` represent inside a PowerShell Where-Object scriptblock?',
            options: [
              'The current pipeline object being evaluated',
              'The exit code of the last command',
              'The system administrator username',
              'The path to the current directory',
            ],
            correctIndex: 0,
            explanation: '$_ (or $PSItem) represents the current item passing through the pipeline in PowerShell.',
          },
        ],
        debrief: 'Object pipelines eliminate fragile string scraping in enterprise server management.',
        realWorldApplication: 'Enterprise Windows Server farms and Azure cloud automation rely on PowerShell cmdlets for provisioning.',
      },
    ],
  },

  // 8. C & C++ (Core)
  {
    id: 'cpp',
    title: 'C & C++ Systems Programming',
    slug: 'cpp',
    tagline: 'Pointers, manual memory management, CPU caches, compilation, and high-performance engines.',
    category: 'Systems & Low-Level',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'Cpu',
    color: 'blue',
    description: 'Master low-level systems programming, pointers, memory layouts, memory leaks, and high-performance algorithms.',
    careerFocus: 'Systems Programmer / Embedded Engineer / AI Kernel Developer',
    prerequisites: [],
    estimatedHours: 28,
    lessons: [
      {
        id: 'cpp-01',
        trackId: 'cpp',
        title: 'Memory Addresses, Pointers & Buffer Bounds',
        order: 1,
        difficulty: 'intermediate',
        estimatedMinutes: 30,
        prerequisites: [],
        briefing: 'Inspect how memory addresses and pointers work, and prevent dangerous buffer overflows.',
        objectives: [
          'Understand stack vs heap memory allocation',
          'Dereference pointers and understand address-of (&) operator',
          'Identify and prevent buffer overrun vulnerabilities',
        ],
        conceptExplanation: 'In C, a pointer is simply a variable whose value is the numeric memory address of another variable. There is no garbage collector; you must allocate (malloc) and free memory manually. Exceeding buffer limits causes memory corruption or security exploits.',
        realWorldAnalogy: 'A pointer is a post office box number written on a slip of paper. The slip is not the package; it tells you where to find the package.',
        demonstrationCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int capacity = 1024;
    int *buffer = (int*)malloc(capacity * sizeof(int));
    if (buffer == NULL) return 1;
    
    buffer[0] = 42;
    printf("Value: %d, Address: %p\\n", *buffer, (void*)buffer);
    
    free(buffer); // Prevent memory leak
    return 0;
}`,
        demonstrationExplanation: 'We allocate 1024 integers on the heap, store 42 in index 0, dereference with *buffer, and deallocate memory with free().',
        guidedExercisePrompt: 'Write a memory bounds validator `solution(index, bufferSize)` that returns `true` if index is within valid bounds `[0, bufferSize - 1]`, and `false` otherwise.',
        starterCode: `function solution(index, bufferSize) {
  return index >= 0 && index < bufferSize;
}`,
        solutionCode: `function solution(index, bufferSize) {
  return index >= 0 && index < bufferSize;
}`,
        testCases: [
          { id: 'tc-cpp-1', description: 'Index 5 in size 10 is safe', input: 'solution(5, 10)', expectedOutput: true },
          { id: 'tc-cpp-2', description: 'Index 10 in size 10 is out-of-bounds (OOB)', input: 'solution(10, 10)', expectedOutput: false },
          { id: 'tc-cpp-3', description: 'Negative index is invalid', input: 'solution(-1, 10)', expectedOutput: false },
        ],
        troubleshootingTips: ['In 0-indexed arrays of size N, the last valid index is N - 1.'],
        knowledgeCheck: [
          {
            question: 'What happens if a program allocates memory with malloc() but never calls free() before running for weeks?',
            options: [
              'The memory automatically frees itself when CPU usage drops',
              'The program leaks memory, gradually consuming system RAM until killed by the OOM killer',
              'The compiler warns you at runtime',
              'The operating system restarts the server automatically',
            ],
            correctIndex: 1,
            explanation: 'Memory leaks cause resident set size (RSS) to grow indefinitely until the OS kernel out-of-memory (OOM) killer terminates the process.',
          },
        ],
        debrief: 'Rigorous memory bounds checking is the #1 defense against remote code execution vulnerabilities.',
        realWorldApplication: 'The Linux kernel, PyTorch CUDA kernels, and high-frequency trading engines are authored in C and C++.',
      },
    ],
  },

  // 9. Go (Core)
  {
    id: 'go',
    title: 'Go Systems & Cloud Microservices',
    slug: 'go',
    tagline: 'Goroutines, channels, fast compilation, statically linked binaries, and cloud tooling.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'Boxes',
    color: 'cyan',
    description: 'Build fast, concurrent networking services and tools using goroutines, channels, and Go standard library.',
    careerFocus: 'Cloud Infrastructure Engineer / Kubernetes Developer',
    prerequisites: [],
    estimatedHours: 20,
    lessons: [
      {
        id: 'go-01',
        trackId: 'go',
        title: 'Goroutines, Channels & Worker Pools',
        order: 1,
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        prerequisites: [],
        briefing: 'Design a concurrent job worker pool in Go that balances tasks across CPU cores.',
        objectives: [
          'Understand M:N green thread goroutine scheduling',
          'Communicate across threads via typed channels without shared locks',
          'Implement worker pool patterns',
        ],
        conceptExplanation: 'Go avoids heavyweight OS threads (which consume ~2MB stack each). Goroutines start with only ~2KB stack and are scheduled across OS threads by the Go runtime. Channels allow safe communication: "Do not communicate by sharing memory; instead, share memory by communicating."',
        realWorldAnalogy: 'Instead of ten people fighting over one shared notebook (locks), each person has an inbox chute (channel) where new assignment cards drop in.',
        demonstrationCode: `func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}`,
        demonstrationExplanation: 'Workers read from the unidirectional receive-only channel jobs and post outputs to results.',
        guidedExercisePrompt: 'Write a simulated worker balancer `solution(jobCount, workerCount)` that calculates how many jobs each worker receives if divided evenly, plus the remainder.',
        starterCode: `function solution(jobCount, workerCount) {
  const perWorker = Math.floor(jobCount / workerCount);
  const remainder = jobCount % workerCount;
  return { perWorker, remainder };
}`,
        solutionCode: `function solution(jobCount, workerCount) {
  const perWorker = Math.floor(jobCount / workerCount);
  const remainder = jobCount % workerCount;
  return { perWorker, remainder };
}`,
        testCases: [
          { id: 'tc-go-1', description: '10 jobs across 3 workers', input: 'solution(10, 3)', expectedOutput: '{"perWorker":3,"remainder":1}' },
        ],
        troubleshootingTips: ['Use integer division Math.floor and modulus operator %.'],
        knowledgeCheck: [
          {
            question: 'Why are Go goroutines able to scale to tens of thousands per process while OS threads cannot?',
            options: [
              'Goroutines do not use RAM',
              'Goroutines have dynamic resizable stacks starting at just 2KB compared to fixed 1-2MB OS thread stacks',
              'Go disables garbage collection during goroutine execution',
              'Goroutines only run on Intel processors',
            ],
            correctIndex: 1,
            explanation: 'A 2KB initial stack allows a single 16GB server to hold millions of concurrent goroutines without exhausting memory.',
          },
        ],
        debrief: 'Concurrency primitives make Go the language of choice for cloud infrastructure.',
        realWorldApplication: 'Docker, Kubernetes, Prometheus, Terraform, and CockroachDB are all built in Go.',
      },
    ],
  },

  // 10. Rust (Core)
  {
    id: 'rust',
    title: 'Rust Systems & Memory Safety',
    slug: 'rust',
    tagline: 'Ownership, borrowing, lifetimes, zero-cost abstractions, and fearless concurrency.',
    category: 'Systems & Low-Level',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'Shield',
    color: 'orange',
    description: 'Learn ownership, mutable borrowing, lifetimes, match patterns, and high-performance safety without a GC.',
    careerFocus: 'Systems Architect / Security Engineer / High-Performance Dev',
    prerequisites: [],
    estimatedHours: 26,
    lessons: [
      {
        id: 'rs-01',
        trackId: 'rust',
        title: 'The Ownership Model: Move Semantics & Borrow Checker',
        order: 1,
        difficulty: 'intermediate',
        estimatedMinutes: 30,
        prerequisites: [],
        briefing: 'Understand how the Rust borrow checker prevents data races and use-after-free at compile time.',
        objectives: [
          'Understand the three rules of ownership in Rust',
          'Differentiate between move semantics and borrowing references (&T, &mut T)',
          'Prevent simultaneous mutable and immutable borrows',
        ],
        conceptExplanation: 'Rust enforces memory safety without a garbage collector through ownership: 1) Each value has an owner. 2) There can only be one owner at a time. 3) When the owner goes out of scope, the value is dropped. You can have any number of immutable references (&T) OR exactly one mutable reference (&mut T), but never both.',
        realWorldAnalogy: 'A library book: either twenty people can sit in the reading room viewing copies (&), or one person can borrow the book to make corrections (&mut), but not both simultaneously.',
        demonstrationCode: `fn process_telemetry(payload: String) {
    println!("Processing: {}", payload);
} // payload dropped here

fn main() {
    let raw = String::from("GPU_FAN_SPEED=75%");
    process_telemetry(raw); // raw moved!
    // println!("{}", raw); // COMPILE ERROR: value borrowed after move!
}`,
        demonstrationExplanation: 'Because process_telemetry takes ownership of raw, the original variable cannot be accessed afterward, eliminating use-after-free bugs entirely.',
        guidedExercisePrompt: 'Write a validation function `solution(hasImmutableBorrows, requestingMutableBorrow)` that returns `false` if someone requests a mutable borrow while immutable borrows exist, or `true` otherwise.',
        starterCode: `function solution(hasImmutableBorrows, requestingMutableBorrow) {
  if (hasImmutableBorrows > 0 && requestingMutableBorrow) {
    return false; // Aliasing XOR Mutability violated
  }
  return true;
}`,
        solutionCode: `function solution(hasImmutableBorrows, requestingMutableBorrow) {
  if (hasImmutableBorrows > 0 && requestingMutableBorrow) {
    return false;
  }
  return true;
}`,
        testCases: [
          { id: 'tc-rs-1', description: 'Rejects mutable borrow with 2 active readers', input: 'solution(2, true)', expectedOutput: false },
          { id: 'tc-rs-2', description: 'Allows readers when no writer requested', input: 'solution(3, false)', expectedOutput: true },
          { id: 'tc-rs-3', description: 'Allows writer when 0 readers exist', input: 'solution(0, true)', expectedOutput: true },
        ],
        troubleshootingTips: ['Remember the Aliasing XOR Mutability rule.'],
        knowledgeCheck: [
          {
            question: 'When is memory freed in a standard Rust application?',
            options: [
              'When the mark-and-sweep garbage collector runs every 10 seconds',
              'Immediately when the owning variable drops out of scope, via the Drop trait at compile-time determined locations',
              'Only when the computer reboots',
              'When the operating system asks for memory',
            ],
            correctIndex: 1,
            explanation: 'Rust inserts deterministic deallocation code (RAII / Drop) at compile time as soon as a variable leaves its lexical scope.',
          },
        ],
        debrief: 'Rust provides C-level speed with mathematical guarantees against memory corruption vulnerabilities.',
        realWorldApplication: 'The Linux kernel now incorporates Rust drivers; Android and Windows are rewriting critical networking stacks in Rust.',
      },
    ],
  },

  // 11. Dockerfile & Container Architecture (Core)
  {
    id: 'dockerfile',
    title: 'Dockerfile & Container Engineering',
    slug: 'dockerfile',
    tagline: 'Multi-stage builds, layer caching, minimal attack surfaces, and cgroup isolation.',
    category: 'Infrastructure as Code',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'Package',
    color: 'blue',
    description: 'Craft production-grade Dockerfiles, optimize layer caches, build distroless images, and configure Compose.',
    careerFocus: 'DevOps Engineer / Platform Engineer',
    prerequisites: [],
    estimatedHours: 16,
    lessons: [
      {
        id: 'df-01',
        trackId: 'dockerfile',
        title: 'Multi-Stage Builds & Minimal Attack Surfaces',
        order: 1,
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        prerequisites: [],
        briefing: 'Construct an optimized multi-stage Dockerfile that discards compiler bloat from the final production image.',
        objectives: [
          'Separate build environments from runtime environments',
          'Leverage layer caching by copying dependencies before source code',
          'Run containers as non-root users',
        ],
        conceptExplanation: 'Standard Docker builds often leave gigabytes of compilers, header files, and package manager caches inside the container. Multi-stage builds use multiple FROM lines, copying only the compiled binary or dist files into a clean minimal base (e.g. Alpine or distroless), shrinking image size from 1.5GB to 25MB.',
        realWorldAnalogy: 'When building a house, you bring scaffolding, cement mixers, and cranes. Once the house is finished, you do not leave the crane in the living room; you remove the construction tools.',
        demonstrationCode: `# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine AS runner
WORKDIR /app
USER node
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]`,
        demonstrationExplanation: 'The runner stage inherits none of the build dependencies or caches from the builder stage.',
        guidedExercisePrompt: 'Write a calculation function `solution(originalSizeMb, binarySizeMb)` that returns the percentage reduction in image size achieved by multi-stage pruning.',
        starterCode: `function solution(originalSizeMb, binarySizeMb) {
  const reduction = ((originalSizeMb - binarySizeMb) / originalSizeMb) * 100;
  return Math.round(reduction);
}`,
        solutionCode: `function solution(originalSizeMb, binarySizeMb) {
  const reduction = ((originalSizeMb - binarySizeMb) / originalSizeMb) * 100;
  return Math.round(reduction);
}`,
        testCases: [
          { id: 'tc-df-1', description: 'Reduces 1000MB to 50MB (95% drop)', input: 'solution(1000, 50)', expectedOutput: 95 },
          { id: 'tc-df-2', description: 'Reduces 500MB to 100MB (80% drop)', input: 'solution(500, 100)', expectedOutput: 80 },
        ],
        troubleshootingTips: ['Formula: ((original - final) / original) * 100.'],
        knowledgeCheck: [
          {
            question: 'Why should `COPY package*.json ./` happen before `COPY . .` in a Dockerfile?',
            options: [
              'Because Docker requires package.json at the top of the file',
              'To take advantage of Docker layer caching, so npm ci only reruns when dependencies actually change',
              'To encrypt the source code files',
              'To speed up network download speeds',
            ],
            correctIndex: 1,
            explanation: 'Docker caches each instruction layer. Placing package.json first ensures npm install is skipped if only source files changed.',
          },
        ],
        debrief: 'Lean containers boot faster, consume less network bandwidth, and minimize vulnerabilities.',
        realWorldApplication: 'High-security Kubernetes clusters mandate non-root, multi-stage distroless containers for production workloads.',
      },
    ],
  },

  // 12. Terraform & HCL (Core)
  {
    id: 'terraform',
    title: 'Terraform & Infrastructure as Code',
    slug: 'terraform',
    tagline: 'Declarative cloud provisioning, state locks, dependency graphs, and multi-cloud architectures.',
    category: 'Infrastructure as Code',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'Layers',
    color: 'purple',
    description: 'Automate physical and virtual infrastructure provisioning with HashiCorp Configuration Language (HCL).',
    careerFocus: 'Cloud Architect / Infrastructure Engineer',
    prerequisites: [],
    estimatedHours: 18,
    lessons: [
      {
        id: 'tf-01',
        trackId: 'terraform',
        title: 'Declarative State & The Infrastructure Lifecycle',
        order: 1,
        difficulty: 'intermediate',
        estimatedMinutes: 25,
        prerequisites: [],
        briefing: 'Understand Terraform plan, apply, and state file reconciliation.',
        objectives: [
          'Understand declarative HCL syntax vs imperative scripts',
          'Analyze terraform plan execution graphs',
          'Manage remote state locking to prevent concurrent overwrite corruption',
        ],
        conceptExplanation: 'Imperative tools tell the system HOW to create a server step-by-step. Declarative tools like Terraform describe the DESIRED END STATE. Terraform compares current real-world state with desired state in your .tf files and creates an execution plan to reconcile the difference.',
        realWorldAnalogy: 'A thermostat: you do not write a script saying "burn 3 liters of gas for 12 minutes". You set the dial to 70 degrees. The thermostat checks current temperature and activates heating only as needed.',
        demonstrationCode: `resource "proxmox_vm_qemu" "ai_node_01" {
  name        = "tinydc-ai-node-01"
  target_node = "pve-rack-c"
  cores       = 32
  memory      = 65536
  disk {
    size    = "500G"
    storage = "zfs-fast-pool"
  }
}`,
        demonstrationExplanation: 'This resource block declares a 32-core VM with 64GB RAM on Proxmox node pve-rack-c.',
        guidedExercisePrompt: 'Write a reconciliation calculator `solution(existingCount, desiredCount)` that outputs `{ toCreate, toDestroy, unchanged }`.',
        starterCode: `function solution(existingCount, desiredCount) {
  if (desiredCount > existingCount) {
    return { toCreate: desiredCount - existingCount, toDestroy: 0, unchanged: existingCount };
  } else {
    return { toCreate: 0, toDestroy: existingCount - desiredCount, unchanged: desiredCount };
  }
}`,
        solutionCode: `function solution(existingCount, desiredCount) {
  if (desiredCount > existingCount) {
    return { toCreate: desiredCount - existingCount, toDestroy: 0, unchanged: existingCount };
  } else {
    return { toCreate: 0, toDestroy: existingCount - desiredCount, unchanged: desiredCount };
  }
}`,
        testCases: [
          { id: 'tc-tf-1', description: 'Scales up from 2 to 5 nodes', input: 'solution(2, 5)', expectedOutput: '{"toCreate":3,"toDestroy":0,"unchanged":2}' },
          { id: 'tc-tf-2', description: 'Scales down from 6 to 4 nodes', input: 'solution(6, 4)', expectedOutput: '{"toCreate":0,"toDestroy":2,"unchanged":4}' },
        ],
        troubleshootingTips: ['Check both scale up and scale down branches.'],
        knowledgeCheck: [
          {
            question: 'What happens if two engineers run `terraform apply` simultaneously without remote state locking?',
            options: [
              'Terraform merges both runs automatically with git',
              'Race conditions can corrupt the state file or provision duplicate conflicting resources',
              'The second engineer is prompted for an admin password',
              'The first run is cancelled immediately',
            ],
            correctIndex: 1,
            explanation: 'State locking (via S3 DynamoDB or Consul) guarantees mutual exclusion during state modifications.',
          },
        ],
        debrief: 'Declarative IaC allows reproducible recreation of entire data centers from version-controlled git repositories.',
        realWorldApplication: 'Every major cloud provider and private cloud uses Terraform to manage thousands of servers automatically.',
      },
    ],
  },

  // 13. Ansible Playbooks (Core)
  {
    id: 'ansible',
    title: 'Ansible Configuration Management',
    slug: 'ansible',
    tagline: 'Agentless SSH automation, idempotent playbooks, inventory management, and server hardening.',
    category: 'Infrastructure as Code',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'PlayCircle',
    color: 'emerald',
    description: 'Configure fleets of Linux servers over SSH without installing client agents using YAML playbooks.',
    careerFocus: 'Systems Administrator / DevOps Automation Engineer',
    prerequisites: ['bash'],
    estimatedHours: 16,
    lessons: [
      {
        id: 'ans-01',
        trackId: 'ansible',
        title: 'Idempotency & Agentless SSH Orchestration',
        order: 1,
        difficulty: 'intermediate',
        estimatedMinutes: 20,
        prerequisites: [],
        briefing: 'Understand Ansible idempotency: executing a playbook 10 times produces the exact same state as running it once.',
        objectives: [
          'Understand agentless SSH architecture',
          'Define inventory hosts and group variables',
          'Write idempotent tasks using built-in modules (apt, systemd, copy)',
        ],
        conceptExplanation: 'Idempotence means an operation can be applied multiple times without changing the result beyond the initial application. If a service is already running, an idempotent task reports "ok" instead of blindly restarting it.',
        realWorldAnalogy: 'An elevator call button: pressing the button once calls the elevator. Pressing it five more times does not spawn five more elevators.',
        demonstrationCode: `- name: Configure Tiny DC Web Node
  hosts: webservers
  become: yes
  tasks:
    - name: Ensure Nginx is installed
      ansible.builtin.apt:
        name: nginx
        state: present

    - name: Ensure Nginx is running and enabled
      ansible.builtin.systemd:
        name: nginx
        state: started
        enabled: yes`,
        demonstrationExplanation: 'If Nginx is already installed and running, Ansible takes no action and reports ok=2 changed=0.',
        guidedExercisePrompt: 'Write an idempotent state check `solution(currentState, targetState)` that returns `"changed"` if states differ, or `"ok"` if already in target state.',
        starterCode: `function solution(currentState, targetState) {
  return currentState === targetState ? 'ok' : 'changed';
}`,
        solutionCode: `function solution(currentState, targetState) {
  return currentState === targetState ? 'ok' : 'changed';
}`,
        testCases: [
          { id: 'tc-ans-1', description: 'Reports ok when already running', input: 'solution("running", "running")', expectedOutput: 'ok' },
          { id: 'tc-ans-2', description: 'Reports changed when transitioning stopped to running', input: 'solution("stopped", "running")', expectedOutput: 'changed' },
        ],
        troubleshootingTips: ['Compare string equality strictly.'],
        knowledgeCheck: [
          {
            question: 'Why is Ansible called "agentless"?',
            options: [
              'It does not use passwords',
              'It requires no dedicated daemon or client software installed on managed nodes; it connects over standard OpenSSH and executes Python',
              'It only works on bare metal hardware',
              'It does not produce logs',
            ],
            correctIndex: 1,
            explanation: 'Ansible uses the target server\'s existing SSH daemon and Python interpreter, requiring zero proprietary agents.',
          },
        ],
        debrief: 'Idempotent playbooks ensure server fleets never drift out of compliance.',
        realWorldApplication: 'Red Hat and enterprise operations manage thousands of production servers simultaneously with Ansible automation.',
      },
    ],
  },

  // 14. JSON & YAML (Core)
  {
    id: 'json-yaml',
    title: 'JSON & YAML Configuration Formats',
    slug: 'json-yaml',
    tagline: 'Structured serialization, Kubernetes manifests, schema validation, and config hygiene.',
    category: 'Markup & Configuration',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'FileCode',
    color: 'yellow',
    description: 'Learn data serialization standards, avoid indentation traps in YAML, and validate configuration schemas.',
    careerFocus: 'DevOps Engineer / Cloud Developer',
    prerequisites: [],
    estimatedHours: 12,
    lessons: [
      {
        id: 'jy-01',
        trackId: 'json-yaml',
        title: 'Serialization Schemas & Formatting Pitfalls',
        order: 1,
        difficulty: 'beginner',
        estimatedMinutes: 15,
        prerequisites: [],
        briefing: 'Understand differences between JSON and YAML, indentation rules, and data type coercion.',
        objectives: [
          'Parse and validate JSON strings and schemas',
          'Understand YAML 2-space indentation rules and comments',
          'Prevent unintended type conversions (e.g. Norway problem: country code NO becoming boolean false)',
        ],
        conceptExplanation: 'JSON is strict, concise, and natively supported by web browsers. YAML is human-readable and superset of JSON, commonly used for Kubernetes manifests, GitHub Actions, and Docker Compose.',
        realWorldAnalogy: 'JSON is like a standardized shipping barcode; YAML is the clearly printed packing slip on top of the crate.',
        demonstrationCode: `# Kubernetes Service Specification in YAML
apiVersion: v1
kind: Service
metadata:
  name: tinydc-api
spec:
  type: ClusterIP
  ports:
    - port: 8080
      targetPort: 8080
  selector:
    app: tinydc-api`,
        demonstrationExplanation: 'YAML maps keys to values using colons and spaces. Lists are indicated by hyphens.',
        guidedExercisePrompt: 'Write a parser validator `solution(jsonString)` that returns `true` if string is valid JSON and has a numeric `port` property, else `false`.',
        starterCode: `function solution(jsonString) {
  try {
    const obj = JSON.parse(jsonString);
    return typeof obj.port === 'number';
  } catch (e) {
    return false;
  }
}`,
        solutionCode: `function solution(jsonString) {
  try {
    const obj = JSON.parse(jsonString);
    return typeof obj.port === 'number';
  } catch (e) {
    return false;
  }
}`,
        testCases: [
          { id: 'tc-jy-1', description: 'Valid JSON with port 8080', input: 'solution("{\\"port\\": 8080}")', expectedOutput: true },
          { id: 'tc-jy-2', description: 'Invalid JSON syntax', input: 'solution("{port: 8080}")', expectedOutput: false },
          { id: 'tc-jy-3', description: 'Missing port property', input: 'solution("{\\"name\\": \\"api\\"}")', expectedOutput: false },
        ],
        troubleshootingTips: ['JSON requires double quotes around property names.'],
        knowledgeCheck: [
          {
            question: 'What is the infamous "Norway problem" in YAML parsing?',
            options: [
              'Servers in Norway cannot parse YAML',
              'The ISO country code "NO" is unquoted and automatically parsed by older YAML specifications as boolean False',
              'YAML cannot parse Scandinavian characters',
              'Network timeouts occur when downloading files',
            ],
            correctIndex: 1,
            explanation: 'YAML 1.1 treated unquoted y, n, yes, no, on, off as booleans. Thus NO was converted to false.',
          },
        ],
        debrief: 'Rigorous validation of configuration files prevents silent production deployment failures.',
        realWorldApplication: 'Kubernetes API servers validate all YAML manifests against OpenAPI JSON schemas before committing to etcd.',
      },
    ],
  },

  // 15. Regular Expressions (Core)
  {
    id: 'regex',
    title: 'Regular Expressions & Pattern Matching',
    slug: 'regex',
    tagline: 'Log parsing, forensic analysis, security sanitization, and token extraction.',
    category: 'Security & Patterns',
    executionEngine: 'javascript',
    status: 'Complete',
    icon: 'Search',
    color: 'pink',
    description: 'Master pattern matching, capture groups, lookarounds, and secure regex design against ReDoS attacks.',
    careerFocus: 'Cybersecurity Analyst / Security Engineer',
    prerequisites: [],
    estimatedHours: 14,
    lessons: [
      {
        id: 're-01',
        trackId: 'regex',
        title: 'IPv4 Extraction & Forensic Log Parsing',
        order: 1,
        difficulty: 'intermediate',
        estimatedMinutes: 20,
        prerequisites: [],
        briefing: 'Extract valid IPv4 addresses from raw firewall packet dump strings.',
        objectives: [
          'Use character classes and quantifier ranges',
          'Understand word boundaries (\\b) to avoid partial octet matching',
          'Extract structured capture groups',
        ],
        conceptExplanation: 'Regular expressions define formal search patterns. In cybersecurity forensics, security analysts use regex to extract IOCs (Indicators of Compromise) such as IP addresses, hashes, and URLs from terabytes of firewall and auth logs.',
        realWorldAnalogy: 'Like a metal detector tuned specifically to gold: it ignores sand, rocks, and aluminum, triggering only on matching atomic signatures.',
        demonstrationCode: `const logLine = "SRC=192.168.1.105 DST=10.0.0.1 PROTO=TCP SPT=54120 DPT=443";
const ipv4Regex = /\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b/g;
const ips = logLine.match(ipv4Regex);
console.log("Extracted IPs:", ips); // ["192.168.1.105", "10.0.0.1"]`,
        demonstrationExplanation: 'We use word boundaries \\b, a non-capturing group repeating 3 times for octets, followed by the final octet.',
        guidedExercisePrompt: 'Write a regex extractor `solution(text)` that returns an array of all IPv4 strings found in the text.',
        starterCode: `function solution(text) {
  const regex = /\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b/g;
  return text.match(regex) || [];
}`,
        solutionCode: `function solution(text) {
  const regex = /\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b/g;
  return text.match(regex) || [];
}`,
        testCases: [
          { id: 'tc-re-1', description: 'Extracts IP from string', input: 'solution("Connection from 10.0.1.50 port 22")', expectedOutput: '["10.0.1.50"]' },
          { id: 'tc-re-2', description: 'Returns empty array when no IP present', input: 'solution("Host not found")', expectedOutput: '[]' },
        ],
        troubleshootingTips: ['Remember global flag /g to find all occurrences.'],
        knowledgeCheck: [
          {
            question: 'What is a ReDoS (Regular Expression Denial of Service) attack?',
            options: [
              'Flooding the network with regex files',
              'An attacker feeds input causing catastrophic polynomial or exponential backtracking in poorly written regex, freezing the CPU at 100%',
              'Deleting the regex library from Linux',
              'Injecting SQL into regex parameters',
            ],
            correctIndex: 1,
            explanation: 'Catastrophic backtracking occurs when nested quantifiers like (a+)+ evaluate pathological inputs, exhausting CPU resources.',
          },
        ],
        debrief: 'Efficient regex patterns enable fast security triage and log extraction.',
        realWorldApplication: 'Suricata, Snort, and Splunk rely heavily on high-performance regex engines to detect intrusion signatures in real time.',
      },
    ],
  },

  // 16-35: Catalog Tracks (Systematically documented with syllabus & career paths)
  {
    id: 'java',
    title: 'Java Enterprise Systems',
    slug: 'java',
    tagline: 'JVM internals, garbage collection tuning, Spring Boot microservices, and enterprise concurrency.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Coffee',
    color: 'orange',
    description: 'Master JVM memory management, heap dumps, garbage collectors (G1, ZGC), and robust backend systems.',
    careerFocus: 'Enterprise Backend Architect / Systems Engineer',
    prerequisites: [],
    estimatedHours: 25,
    lessons: [],
  },
  {
    id: 'csharp',
    title: 'C# & .NET High-Performance',
    slug: 'csharp',
    tagline: 'Modern .NET Core, async task pipelines, memory spans, and cross-platform server runtimes.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Code',
    color: 'purple',
    description: 'Build high-throughput server backends and game engines using C# 12, Span<T>, and memory allocations.',
    careerFocus: 'Backend Engineer / Cloud Systems Architect',
    prerequisites: [],
    estimatedHours: 22,
    lessons: [],
  },
  {
    id: 'php',
    title: 'Modern PHP & Web Services',
    slug: 'php',
    tagline: 'PHP 8.3 JIT compiler, strict typing, Laravel architecture, and server execution models.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Globe',
    color: 'indigo',
    description: 'Learn modern typed PHP, opcode caches, PHP-FPM worker pools, and scalable web services.',
    careerFocus: 'Web Application Engineer',
    prerequisites: [],
    estimatedHours: 16,
    lessons: [],
  },
  {
    id: 'ruby',
    title: 'Ruby & Automation Systems',
    slug: 'ruby',
    tagline: 'Metaprogramming, Ruby on Rails, Chef infrastructure management, and elegant scripting.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Gem',
    color: 'red',
    description: 'Master object orientation, closures, blocks, and automation frameworks.',
    careerFocus: 'Backend Engineer / DevOps Specialist',
    prerequisites: [],
    estimatedHours: 16,
    lessons: [],
  },
  {
    id: 'swift',
    title: 'Swift Systems & Server-Side',
    slug: 'swift',
    tagline: 'ARC memory management, protocols, swift-concurrency, and Apple ecosystem administration.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Zap',
    color: 'orange',
    description: 'Learn Swift modern concurrency, async-await, actors, and cross-platform server-side Swift.',
    careerFocus: 'macOS Systems Specialist / iOS Platform Engineer',
    prerequisites: [],
    estimatedHours: 18,
    lessons: [],
  },
  {
    id: 'kotlin',
    title: 'Kotlin & Multiplatform Architecture',
    slug: 'kotlin',
    tagline: 'Coroutines, null safety, JVM interoperability, and multiplatform server engines.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Smartphone',
    color: 'purple',
    description: 'Build reactive server microservices with lightweight coroutines and modern type safety.',
    careerFocus: 'Android & Backend Systems Engineer',
    prerequisites: [],
    estimatedHours: 18,
    lessons: [],
  },
  {
    id: 'dart',
    title: 'Dart & Cross-Platform UI Engines',
    slug: 'dart',
    tagline: 'Event loops, Isolates, AOT compilation, and declarative client architectures.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Layers',
    color: 'cyan',
    description: 'Learn Dart sound null safety, isolate threading models, and high-FPS client rendering.',
    careerFocus: 'Full-Stack Client Engineer',
    prerequisites: [],
    estimatedHours: 15,
    lessons: [],
  },
  {
    id: 'r-lang',
    title: 'R for Statistical & Telemetry Analytics',
    slug: 'r-lang',
    tagline: 'Data frames, ggplot2, statistical modelling, and infrastructure telemetry analytics.',
    category: 'Data & Query Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'LineChart',
    color: 'blue',
    description: 'Analyze server metric trends, capacity exhaustion forecasts, and anomalies using statistical computing.',
    careerFocus: 'Data Scientist / SRE Telemetry Analyst',
    prerequisites: [],
    estimatedHours: 16,
    lessons: [],
  },
  {
    id: 'julia',
    title: 'Julia High-Performance Scientific Computing',
    slug: 'julia',
    tagline: 'Multiple dispatch, LLVM JIT compilation, mathematical computing, and parallel simulation.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Activity',
    color: 'purple',
    description: 'Solve the two-language problem: prototype at Python speed and execute at C velocity for AI and numerical modeling.',
    careerFocus: 'Scientific Computing & AI Researcher',
    prerequisites: [],
    estimatedHours: 20,
    lessons: [],
  },
  {
    id: 'lua',
    title: 'Lua for Embedded Systems & Nginx',
    slug: 'lua',
    tagline: 'Ultra-lightweight scripting, OpenResty API gateways, Redis scripts, and game engines.',
    category: 'Scripting & Shell',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Radio',
    color: 'blue',
    description: 'Embed Lua into Nginx reverse proxies, write atomic Redis transaction scripts, and manage low-resource microcontrollers.',
    careerFocus: 'API Gateway Engineer / Embedded Developer',
    prerequisites: [],
    estimatedHours: 14,
    lessons: [],
  },
  {
    id: 'perl',
    title: 'Perl for Legacy Systems & Text Wrangling',
    slug: 'perl',
    tagline: 'Regex mastery, CPAN, system administration scripts, and legacy Unix maintenance.',
    category: 'Scripting & Shell',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'FileText',
    color: 'slate',
    description: 'Maintain critical legacy enterprise scripts and master deep text-processing pipelines.',
    careerFocus: 'Unix Systems Administrator',
    prerequisites: [],
    estimatedHours: 14,
    lessons: [],
  },
  {
    id: 'scala',
    title: 'Scala & Distributed Big Data',
    slug: 'scala',
    tagline: 'Functional programming, Apache Spark, Akka/Pekko actor systems, and distributed stream processing.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Network',
    color: 'red',
    description: 'Process petabytes of data across distributed Spark clusters combining functional purity with JVM scale.',
    careerFocus: 'Big Data Architect / Distributed Systems Engineer',
    prerequisites: [],
    estimatedHours: 22,
    lessons: [],
  },
  {
    id: 'elixir',
    title: 'Elixir & The Erlang BEAM VM',
    slug: 'elixir',
    tagline: 'Actor concurrency, nine-nines uptime, fault tolerance, and millions of active WebSocket connections.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Flame',
    color: 'purple',
    description: 'Build indestructible real-time distributed systems on the legendary Erlang telecom runtime.',
    careerFocus: 'Real-Time Distributed Systems Engineer',
    prerequisites: [],
    estimatedHours: 20,
    lessons: [],
  },
  {
    id: 'haskell',
    title: 'Haskell Pure Functional Computing',
    slug: 'haskell',
    tagline: 'Monads, pure functions, lazy evaluation, category theory, and mathematical correctness.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Code2',
    color: 'purple',
    description: 'Achieve zero side-effects and compile-time proofs of correctness with advanced type theory.',
    careerFocus: 'Language Designer / Formal Verification Specialist',
    prerequisites: [],
    estimatedHours: 26,
    lessons: [],
  },
  {
    id: 'assembly',
    title: 'Assembly Fundamentals (x86-64 & ARM64)',
    slug: 'assembly',
    tagline: 'Registers, stack frames, CPU opcodes, calling conventions, and reverse engineering.',
    category: 'Systems & Low-Level',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Cpu',
    color: 'emerald',
    description: 'Look beneath high-level abstractions: inspect RAX/RBX registers, system calls, and disassembly.',
    careerFocus: 'Reverse Engineer / Binary Exploitation Researcher',
    prerequisites: [],
    estimatedHours: 30,
    lessons: [],
  },
  {
    id: 'xml',
    title: 'XML & Enterprise Protocols',
    slug: 'xml',
    tagline: 'Namespaces, XPath, XSLT, SOAP, SAML 2.0 authentication, and enterprise config.',
    category: 'Markup & Configuration',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'FileCode',
    color: 'amber',
    description: 'Audit SAML authentication tokens, parse XPath queries, and administer enterprise XML payloads.',
    careerFocus: 'Identity & Access Management (IAM) Specialist',
    prerequisites: [],
    estimatedHours: 12,
    lessons: [],
  },
  {
    id: 'markdown',
    title: 'Markdown & Technical Runbooks',
    slug: 'markdown',
    tagline: 'Standard Markdown, incident runbooks, architecture decision records (ADRs), and documentation.',
    category: 'Markup & Configuration',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'FileText',
    color: 'slate',
    description: 'Author crisp engineering runbooks, post-mortem incident documentation, and OpenAPI descriptions.',
    careerFocus: 'Technical Writer / Systems Architect',
    prerequisites: [],
    estimatedHours: 8,
    lessons: [],
  },
  {
    id: 'graphql',
    title: 'GraphQL API Engineering',
    slug: 'graphql',
    tagline: 'Typed schemas, queries, mutations, subscriptions, N+1 query problem, and dataloaders.',
    category: 'Data & Query Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Share2',
    color: 'pink',
    description: 'Design flexible, high-efficiency client-directed APIs that prevent over-fetching and under-fetching.',
    careerFocus: 'API Architect / Full-Stack Engineer',
    prerequisites: [],
    estimatedHours: 16,
    lessons: [],
  },
  {
    id: 'webassembly',
    title: 'WebAssembly (WASM) & Edge Runtimes',
    slug: 'webassembly',
    tagline: 'Near-native bytecodes, sandboxed execution, WASI edge compute, and browser runtimes.',
    category: 'Systems & Low-Level',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Box',
    color: 'purple',
    description: 'Compile C, Rust, and Go to secure, sandboxed WebAssembly binaries running in edge workers and browsers.',
    careerFocus: 'Edge Compute Architect / WASM Engineer',
    prerequisites: [],
    estimatedHours: 20,
    lessons: [],
  },
  {
    id: 'solidity',
    title: 'Solidity & Smart Contract Security',
    slug: 'solidity',
    tagline: 'EVM mechanics, gas optimization, reentrancy vulnerabilities, and cryptographic contracts.',
    category: 'Programming Languages',
    executionEngine: 'javascript',
    status: 'Partially Complete',
    icon: 'Coins',
    color: 'indigo',
    description: 'Audit smart contracts, master EVM storage slots, prevent reentrancy attacks, and optimize gas.',
    careerFocus: 'Blockchain Security Auditor',
    prerequisites: [],
    estimatedHours: 22,
    lessons: [],
  },
];
