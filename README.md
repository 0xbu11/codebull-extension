# CodeBull - Dynamic Instrument Solution

> Stop guessing. Start inspecting. Skip the rebuild. [Check our website](https://0xbu11.github.io/codebull-extension/)

Dynamic observability for Go. Inject logs, metrics, and traces into your running application directly from VS Code.

## Features

### Dynamic Logging
Inject log statements instantly to capture variable values. Get the data you need without polluting your source code or dirtying your git history.

### Instant Metric
Instantly attach counters and gauges to any line of code. Track hit rates and variable trends without defining globals or registering metrics manually.

### Plug and Play Profiling (Coming Soon)
Start and stop profiling sessions directly from VS Code. Analyze runtime performance without modifying your code or configuring external tools.

### Tracing Everywhere (Coming Soon)
Inject traces on the fly. Visualize execution paths and measure function latency without modifying a single line of code.

## Getting Started

Follow this step-by-step guide to master dynamic instrumentation in VS Code.

### 1. Installation
Search for **"CodeBull"** in the VS Code Marketplace and click Install. Ensure you have a Go project open.

### 2. Injecting Logs
Open any Go file. You will see **CodeLens** actions above your functions. Click **"Set Log"** to inject a log point. The IDE will automatically track the next execution.

### 3. Viewing Live Logs
Open the **CodeBull Log** panel. As your application runs, logs will stream in real-time without you having to rebuild or restart your app.

### 4. Visualizing Metrics
Click **"Set Metric"** via CodeLens. Select a variable to track. Open the **CodeBull Metric** panel to see real-time graphs of the variable's value over time.

---

[Website](https://0xbu11.github.io/codebull-extension/) | [GitHub](https://github.com/0xbu11/codebull-extension)
