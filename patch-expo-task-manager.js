const fs = require('fs');
const path = require('path');

const filePaths = [
  path.join(__dirname, 'node_modules', 'expo-task-manager', 'android', 'src', 'main', 'java', 'expo', 'modules', 'taskManager', 'TaskManagerUtils.java'),
  path.join(__dirname, 'mobile-app', 'driver-app', 'node_modules', 'expo-task-manager', 'android', 'src', 'main', 'java', 'expo', 'modules', 'taskManager', 'TaskManagerUtils.java')
];

let foundAny = false;
for (const filePath of filePaths) {
  if (fs.existsSync(filePath)) {
    foundAny = true;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the signature
    const originalContent = content;
    content = content.replace(
      /public void executeTask\(TaskInterface task, Bundle data, @Nullable TaskExecutionCallback callback\) \{/g,
      'public void executeTask(TaskInterface task, Bundle data) {'
    );
    
    // Replace the method body
    content = content.replace(
      /task\.execute\(data, null, callback\);/g,
      'task.execute(data, null);'
    );
    
    if (content === originalContent && !content.includes('public void executeTask(TaskInterface task, Bundle data) {')) {
        console.error(`ERROR: Failed to patch ${filePath}. The regex did not match.`);
        process.exit(1);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully patched ${filePath}`);
  }
}

if (!foundAny) {
    console.warn("WARNING: expo-task-manager TaskManagerUtils.java not found in expected paths. Patch was not applied.");
    console.log("Searched paths:", filePaths);
}
