"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Wind,
  AlertTriangle,
  Navigation,
  Clock,
  ThermometerSun,
  Droplets,
  ArrowRight,
  MapPin,
  Shield,
  Home,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/ui/navbar';

const getWarningBgColor = (type) => {
  const warningTypes = {
    "Moderate": "bg-orange-100",
    "Severe": "bg-red-100",
    "Low": "bg-yellow-100"
  };
  return warningTypes[type] || "bg-gray-100";
};

const getWarningTextColor = (type) => {
  const warningTypes = {
    "Moderate": "text-orange-800",
    "Severe": "text-red-800",
    "Low": "text-yellow-800"
  };
  return warningTypes[type] || "text-gray-800";
};


const AlertCard = ({ alert }) => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {alert.event}
        </div>
        <span className={`text-sm px-3 py-1 rounded-full ${getWarningBgColor(alert.warningType)} ${getWarningTextColor(alert.warningType)}`}>
          {alert.warningType}
        </span>
      </CardTitle>
      <div className="text-sm text-gray-600">
        Issued by: {alert.issuedBy}
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {alert.warnings.map((warning, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${getWarningBgColor(alert.warningType)}`}
            >
              <h4 className="font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {warning.type}
              </h4>
              <p className="text-sm mt-1">{warning.description}</p>
              <div className="text-sm mt-2">
                Affected areas: {warning.areas.join(', ')}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-semibold mb-3">Safety Measures</h4>
          <ul className="space-y-2">
            {alert.safetyMeasures.map((measure, index) => (
              <li key={index} className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-1 text-blue-500" />
                <span className="text-sm">{measure}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);

const WeatherAlerts = () => {
  const activeWeatherData = {
    alerts: [
      {
        issuedBy: "Govt. of Andhra Pradesh",
        state: "Andhra Pradesh",
        event: "Lightning",
        warningType: "Moderate",
        warnings: [
          {
            type: "Lightning Warning",
            description: "Moderate to severe lightning activity expected in the following areas",
            areas: ["Coastal Andhra Pradesh", "Rayalaseema"]
          }
        ],
        safetyMeasures: [
          "Stay indoors during lightning activity",
          "Avoid open areas and tall objects",
          "Unplug electronic devices",
          "Keep away from windows and doors"
        ]
      },
      {
        issuedBy: "Govt. of Tamil Nadu",
        state: "Tamil Nadu",
        event: "Heavy Rainfall",
        warningType: "Severe",
        warnings: [
          {
            type: "Flood Warning",
            description: "Heavy rainfall may lead to flooding in low-lying areas",
            areas: ["Chennai", "Kanchipuram", "Tiruvallur"]
          }
        ],
        safetyMeasures: [
          "Avoid crossing flooded areas",
          "Keep emergency supplies ready",
          "Follow evacuation orders if issued",
          "Store important documents in waterproof containers"
        ]
      },
      {
        issuedBy: "Govt. of Kerala",
        state: "Kerala",
        event: "High Waves",
        warningType: "Low",
        warnings: [
          {
            type: "Coastal Warning",
            description: "High waves expected along the coast",
            areas: ["Kozhikode", "Kannur", "Kasaragod"]
          }
        ],
        safetyMeasures: [
          "Avoid beach activities",
          "Fishermen advised not to venture into sea",
          "Keep distance from coastal areas",
          "Follow local authority guidelines"
        ]
      }
    ]
  };
  return (
    <div className="">
      {activeWeatherData.alerts.map((alert, index) => (
        <AlertCard key={index} alert={alert} />
      ))}
    </div>
  );
};
const CycloneWarningSystem = () => {
  const [currentAlert, setCurrentAlert] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('coastal-region-1');

  // Mock cyclone data - replace with real API data

  
  
  const mockCycloneData = {
    id: "CYC-2024-IND-001",
    name: "none",
    severity: "none",
    category: 0,
    currentStatus: {
      windSpeed: 7, // km/h
      pressure: 940, // hPa
      rainfall: 250, // mm
      temperature: 29, // °C
      humidity: 90, // %
      movement: "NW",
      movementSpeed: 20, // km/h
    },
    location: {
      latitude: "16.0°N",
      longitude: "71.5°E",
      distanceFromCoast: 120, // km
    },
    forecast: {
      path: [
        { time: "12:00", position: "16.0°N, 71.5°E", intensity: "Severe" },
        { time: "18:00", position: "16.4°N, 71.2°E", intensity: "Severe" },
        { time: "00:00", position: "16.8°N, 70.9°E", intensity: "Very Severe" },
      ],
      expectedIntensification: true,
    },
    warnings: [
      {
        type: "Red Alert",
        areas: ["Mumbai", "Ratnagiri", "Sindhudurg"],
        description: "Severe cyclone impact expected in coastal Maharashtra. Evacuate low-lying areas.",
      },
      {
        type: "Orange Alert",
        areas: ["Goa", "Veraval"],
        description: "Cyclone likely to cause heavy rainfall and strong winds. Exercise caution.",
      },
    ],
    safetyMeasures: [
      "Evacuate low-lying and vulnerable areas promptly",
      "Stay indoors and away from windows during the cyclone",
      "Keep emergency kits ready with essential supplies",
      "Listen to official weather updates and advisories",
      "Secure outdoor objects that can be blown away",
      "Stock up on drinking water and non-perishable food",
      "Charge mobile phones and keep flashlights handy",
      "Avoid venturing into the sea or coastal areas",
    ],
    emergencyContacts: [
      { name: "NDMA Helpline", number: "1078" },
      { name: "Coastal Emergency Response", number: "1800-123-456" },
      { name: "Medical Emergency", number: "108" },
      { name: "Indian Meteorological Department (IMD)", number: "1800-266-7337" },
    ],
  };
  
  // Mock historical wind speed data for graph
  const mockHistoricalData = [
    { time: '00:00', windSpeed: 5 },
    { time: '03:00', windSpeed: 6 },
    { time: '06:00', windSpeed: 6 },
    { time: '09:00', windSpeed: 6 },
    { time: '12:00', windSpeed: 7 },
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentAlert(mockCycloneData);
        setHistoricalData(mockHistoricalData);
      } catch (error) {
        console.error('Error fetching cyclone data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-yellow-500',
      moderate: 'bg-orange-500',
      severe: 'bg-red-500',
      'very severe': 'bg-purple-500',
    };
    return colors[severity.toLowerCase()] || 'bg-gray-500';
  };

  const getWarningBgColor = (type) => {
    const colors = {
      'Red Alert': 'bg-red-50 border-red-200',
      'Orange Alert': 'bg-orange-50 border-orange-200',
      'Yellow Alert': 'bg-yellow-50 border-yellow-200',
    };
    return colors[type] || 'bg-gray-50 border-gray-200';
  };

 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          {/* Loading Text */}
          <p className="text-white text-lg mt-4">Fetching cyclone data...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-500">
      <Navbar />

    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Cyclone Warning System</h1>
        <div className="flex items-center gap-4">
          {/* <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="coastal-region-1">Coastal Region 1</option>
            <option value="coastal-region-2">Coastal Region 2</option>
            <option value="coastal-region-3">Coastal Region 3</option>
          </select> */}
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

          </div>
        </div>
      </div>

      {currentAlert && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Alert Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-6 w-6" />
                Active Cyclone Warning
              </CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-red-800">
                  {currentAlert.name}
                </span>
                <span className={`px-3 py-1 rounded-full text-white text-sm ${getSeverityColor(currentAlert.severity)}`}>
                  Category {currentAlert.category}
                </span>
              </div>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Wind className="h-5 w-5" />
                    <span>Wind Speed</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {currentAlert.currentStatus.windSpeed} km/h
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Navigation className="h-5 w-5" />
                    <span>Movement</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {currentAlert.currentStatus.movement} at {currentAlert.currentStatus.movementSpeed} km/h
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="h-5 w-5" />
                    <span>Distance from Coast</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {currentAlert.location.distanceFromCoast} km
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Wind Speed Trend</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="windSpeed"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Current Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    <span>Temperature</span>
                  </div>
                  <span className="font-bold">{currentAlert.currentStatus.temperature}°C</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span>Humidity</span>
                  </div>
                  <span className="font-bold">{currentAlert.currentStatus.humidity}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-gray-500" />
                    <span>Pressure</span>
                  </div>
                  <span className="font-bold">{currentAlert.currentStatus.pressure} hPa</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-indigo-500" />
                    <span>Rainfall</span>
                  </div>
                  <span className="font-bold">{currentAlert.currentStatus.rainfall} mm</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Forecast Track</h4>
                <div className="space-y-3">
                  {currentAlert.forecast.path.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-medium">{point.time}</div>
                        <div className="text-sm text-gray-600">{point.position}</div>
                        <div className="text-sm text-gray-600">{point.intensity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warnings and Safety Measures */}
          {/* <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Warnings & Safety Measures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  {currentAlert.warnings.map((warning, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${getWarningBgColor(warning.type)}`}
                    >
                      <h4 className="font-semibold flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {warning.type}
                      </h4>
                      <p className="text-sm mt-1">{warning.description}</p>
                      <div className="text-sm mt-2">
                        Affected areas: {warning.areas.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Safety Measures</h4>
                  <ul className="space-y-2">
                    {currentAlert.safetyMeasures.map((measure, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Shield className="h-4 w-4 mt-1 text-blue-500" />
                        <span className="text-sm">{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card> */}
          <div className="col-span-2">
          <WeatherAlerts/>
          </div>
          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentAlert.emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <span className="font-medium">{contact.name}</span>
                    <span className="text-blue-600 font-bold">{contact.number}</span>
                  </div>
                ))}
              </div>

              <Alert className="mt-6">
                <AlertDescription>
                  Stay tuned to local radio and TV broadcasts for updates. Follow instructions
                  from emergency services and local authorities.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
    </div>
  );
};

export default CycloneWarningSystem;