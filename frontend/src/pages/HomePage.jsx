import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Play, Trash2, Download, Terminal, Settings, Cloud, Shield, Clock, FileCode, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('deploy');
  const [deploymentStatus, setDeploymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [config, setConfig] = useState({
    region: 'ap-southeast-1',
    stackName: 'lightsail-sandbox-pilot',
    instanceName: 'Sandbox-env',
    bundleId: 'nano_3_0',
    snsTopicArn: ''
  });

  const regions = [
    'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
    'ap-south-1', 'ap-southeast-1', 'ap-southeast-2',
    'eu-central-1', 'eu-west-1', 'eu-west-2'
  ];

  const bundles = [
    { id: 'nano_3_0', name: 'Nano (512 MB RAM, 1 vCPU)' },
    { id: 'micro_3_0', name: 'Micro (1 GB RAM, 1 vCPU)' },
    { id: 'small_3_0', name: 'Small (2 GB RAM, 1 vCPU)' },
    { id: 'medium_3_0', name: 'Medium (4 GB RAM, 2 vCPU)' },
    { id: 'large_3_0', name: 'Large (8 GB RAM, 2 vCPU)' }
  ];

  const handleDeploy = () => {
    setLoading(true);
    // Mock deployment process
    setTimeout(() => {
      setDeploymentStatus('success');
      setLoading(false);
    }, 2000);
  };

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setDeploymentStatus('deleted');
      setLoading(false);
    }, 1500);
  };

  const handleDownloadZip = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/download-project`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sandbox-developers-aws.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sandbox for Developers on AWS</h1>
                <p className="text-sm text-gray-500">Guard-railed sandbox deployment via CloudFormation</p>
              </div>
            </div>
            <Button onClick={handleDownloadZip} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download GitHub Package
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Start Banner */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Start</h3>
                <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-gray-100 space-y-1">
                  <div className="text-gray-400"># 1) Configure settings below</div>
                  <div className="text-gray-400"># 2) Deploy your stack</div>
                  <div className="text-gray-400"># 3) Wait for auto-terminate & cleanup</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Alert */}
        {deploymentStatus && (
          <Alert className={`mb-6 ${deploymentStatus === 'success' ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}`}>
            {deploymentStatus === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-orange-600" />
            )}
            <AlertDescription className={deploymentStatus === 'success' ? 'text-green-800' : 'text-orange-800'}>
              {deploymentStatus === 'success' 
                ? `Stack "${config.stackName}" deployed successfully in ${config.region}!`
                : `Stack "${config.stackName}" deleted successfully.`
              }
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Configuration Panel */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
                <TabsTrigger value="deploy" className="gap-2">
                  <Play className="w-4 h-4" />
                  Deploy
                </TabsTrigger>
                <TabsTrigger value="manage" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Manage
                </TabsTrigger>
                <TabsTrigger value="templates" className="gap-2">
                  <FileCode className="w-4 h-4" />
                  Templates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="deploy" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Deploy Configuration</CardTitle>
                    <CardDescription>
                      Configure your Lightsail sandbox parameters and deploy via CloudFormation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="region">AWS Region</Label>
                        <Select value={config.region} onValueChange={(value) => setConfig({...config, region: value})}>
                          <SelectTrigger id="region">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map(region => (
                              <SelectItem key={region} value={region}>{region}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stackName">Stack Name</Label>
                        <Input
                          id="stackName"
                          value={config.stackName}
                          onChange={(e) => setConfig({...config, stackName: e.target.value})}
                          placeholder="lightsail-sandbox-pilot"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instanceName">Instance Name</Label>
                        <Input
                          id="instanceName"
                          value={config.instanceName}
                          onChange={(e) => setConfig({...config, instanceName: e.target.value})}
                          placeholder="Sandbox-env"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bundleId">Bundle Size</Label>
                        <Select value={config.bundleId} onValueChange={(value) => setConfig({...config, bundleId: value})}>
                          <SelectTrigger id="bundleId">
                            <SelectValue placeholder="Select bundle" />
                          </SelectTrigger>
                          <SelectContent>
                            {bundles.map(bundle => (
                              <SelectItem key={bundle.id} value={bundle.id}>{bundle.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="snsTopicArn">SNS Topic ARN (Optional)</Label>
                      <Input
                        id="snsTopicArn"
                        value={config.snsTopicArn}
                        onChange={(e) => setConfig({...config, snsTopicArn: e.target.value})}
                        placeholder="arn:aws:sns:region:account-id:topic-name"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button 
                        onClick={handleDeploy} 
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 gap-2 flex-1"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Deploying...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Deploy Stack
                          </>
                        )}
                      </Button>
                      <Button 
                        onClick={handleDelete} 
                        disabled={loading}
                        variant="destructive"
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="manage" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Stack Management</CardTitle>
                    <CardDescription>
                      Monitor and manage your CloudFormation stacks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Stack operations will be displayed here. Use the Deploy tab to create or update stacks.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Clock className="w-4 h-4" />
                          Wait for Stack Completion
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <Terminal className="w-4 h-4" />
                          View Stack Diagnostics
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                          Force Delete Stack
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="templates" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>CloudFormation Templates</CardTitle>
                    <CardDescription>
                      View and edit your CloudFormation template
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert className="border-amber-500 bg-amber-50">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800">
                          Template file: <code className="bg-amber-100 px-2 py-1 rounded">templates/lightsail_sandbox_autoterminate.yaml</code>
                        </AlertDescription>
                      </Alert>
                      <Textarea
                        placeholder="CloudFormation YAML template content..."
                        className="font-mono text-sm min-h-[300px]"
                        defaultValue="AWSTemplateFormatVersion: '2010-09-09'\nDescription: 'Lightsail Sandbox with Auto-Termination'\n\nParameters:\n  InstanceName:\n    Type: String\n    Default: Sandbox-env\n  BundleId:\n    Type: String\n    Default: nano_3_0\n\nResources:\n  # Add your resources here"
                      />
                      <Button className="w-full">
                        <FileCode className="w-4 h-4 mr-2" />
                        Save Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Shield className="w-5 h-5" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Guard-Railed Sandbox</h4>
                  <p className="text-sm text-gray-600">Secure, time-limited environments with auto-termination</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Auto Cleanup</h4>
                  <p className="text-sm text-gray-600">Automatic stack deletion after termination</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Port Management</h4>
                  <p className="text-sm text-gray-600">Ports 22, 80, 443 opened automatically</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">SNS Notifications</h4>
                  <p className="text-sm text-gray-600">Get notified on stack events</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>AWS CLI v2 with credentials</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>IAM permissions for CloudFormation, Lightsail, SNS</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>jq utility installed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-white">Common Commands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 font-mono text-sm">
                <div className="bg-black/30 rounded p-2">
                  <span className="text-gray-400">$</span> make deploy
                </div>
                <div className="bg-black/30 rounded p-2">
                  <span className="text-gray-400">$</span> make wait-clean
                </div>
                <div className="bg-black/30 rounded p-2">
                  <span className="text-gray-400">$</span> make delete
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Sandbox for Developers on AWS • MIT License
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;