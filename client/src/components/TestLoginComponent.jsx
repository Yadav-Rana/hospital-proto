import { useEffect, useState } from 'react';
import runTests from '../utils/testLogin';

const TestLoginComponent = () => {
  const [testResults, setTestResults] = useState('Running tests...');

  useEffect(() => {
    const runLoginTests = async () => {
      try {
        // Redirect console.log to capture output
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;
        let output = '';

        console.log = (...args) => {
          output += args.join(' ') + '\n';
          originalConsoleLog(...args);
        };

        console.error = (...args) => {
          output += 'ERROR: ' + args.join(' ') + '\n';
          originalConsoleError(...args);
        };

        // Run the tests
        await runTests();

        // Restore console functions
        console.log = originalConsoleLog;
        console.error = originalConsoleError;

        // Update state with results
        setTestResults(output);
      } catch (error) {
        setTestResults(`Test failed with error: ${error.message}`);
      }
    };

    runLoginTests();
  }, []);

  return (
    <div className="test-login-component">
      <h2>Login Test Results</h2>
      <pre style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        maxHeight: '500px',
        overflow: 'auto'
      }}>
        {testResults}
      </pre>
    </div>
  );
};

export default TestLoginComponent;
