import type { Shipment, ShipmentEvent, RouteStop, Place } from './types'

const HOUR = 3_600_000
const DAY = 24 * HOUR

const iso = (now: number, offsetMs: number) => new Date(now + offsetMs).toISOString()

const place = (city: string, country: string, lng: number, lat: number): Place => ({
  city,
  country,
  coordinates: [lng, lat],
})

/**
 * Demo shipments. Timestamps are generated relative to "now" so the demo always looks live.
 * A real backend should return the same `Shipment` shape.
 */
export function buildMockShipments(now = Date.now()): Shipment[] {
  const shanghai = place('Shanghai', 'China', 121.8, 31.0)
  const singapore = place('Singapore', 'Singapore', 103.85, 1.2)
  const colombo = place('Colombo', 'Sri Lanka', 79.84, 6.95)
  const dubai = place('Dubai', 'UAE', 55.03, 25.01)
  const jeddah = place('Jeddah', 'Saudi Arabia', 39.1, 21.45)
  const portSaid = place('Port Said', 'Egypt', 32.3, 31.27)
  const douala = place('Douala', 'Cameroon', 9.7, 4.05)
  const rotterdam = place('Rotterdam', 'Netherlands', 4.05, 51.95)

  const oceanRoute: RouteStop[] = [
    { ...shanghai, status: 'completed', timestamp: iso(now, -16 * DAY) },
    { ...place('East China Sea', '', 123.5, 25.5), status: 'completed', timestamp: iso(now, -15 * DAY), waypoint: true },
    { ...place('South China Sea', '', 112.5, 10.5), status: 'completed', timestamp: iso(now, -13 * DAY), waypoint: true },
    { ...singapore, status: 'completed', timestamp: iso(now, -11 * DAY) },
    { ...place('Strait of Malacca', '', 97.0, 6.0), status: 'completed', timestamp: iso(now, -10 * DAY), waypoint: true },
    { ...colombo, status: 'completed', timestamp: iso(now, -8 * DAY) },
    { ...place('Arabian Sea', '', 62.0, 21.0), status: 'completed', timestamp: iso(now, -4 * DAY), waypoint: true },
    { ...place('Strait of Hormuz', '', 56.6, 26.4), status: 'completed', timestamp: iso(now, -3 * DAY), waypoint: true },
    { ...dubai, status: 'current', timestamp: iso(now, -2 * 60_000) },
    { ...place('Strait of Hormuz', '', 56.6, 26.4), status: 'upcoming', timestamp: iso(now, 1 * DAY), waypoint: true },
    { ...place('Gulf of Oman', '', 59.5, 22.8), status: 'upcoming', timestamp: iso(now, 1.5 * DAY), waypoint: true },
    { ...place('Gulf of Aden', '', 48.0, 12.8), status: 'upcoming', timestamp: iso(now, 4 * DAY), waypoint: true },
    { ...place('Bab-el-Mandeb', '', 43.3, 12.6), status: 'upcoming', timestamp: iso(now, 4.5 * DAY), waypoint: true },
    { ...jeddah, status: 'upcoming', timestamp: iso(now, 6 * DAY) },
    { ...place('Suez Canal', '', 32.55, 29.9), status: 'upcoming', timestamp: iso(now, 7.5 * DAY), waypoint: true },
    { ...portSaid, status: 'upcoming', timestamp: iso(now, 8 * DAY) },
    { ...place('Mediterranean Sea', '', 18.0, 35.0), status: 'upcoming', timestamp: iso(now, 10 * DAY), waypoint: true },
    { ...place('Strait of Gibraltar', '', -5.6, 35.95), status: 'upcoming', timestamp: iso(now, 12 * DAY), waypoint: true },
    { ...place('Atlantic Ocean', '', -10.0, 39.5), status: 'upcoming', timestamp: iso(now, 12.5 * DAY), waypoint: true },
    { ...place('Bay of Biscay', '', -7.0, 46.5), status: 'upcoming', timestamp: iso(now, 13.5 * DAY), waypoint: true },
    { ...place('English Channel', '', 0.5, 50.3), status: 'upcoming', timestamp: iso(now, 14 * DAY), waypoint: true },
    { ...rotterdam, status: 'upcoming', timestamp: iso(now, 15 * DAY) },
  ]

  const oceanEvents: ShipmentEvent[] = [
    {
      title: 'Shipment Picked Up',
      description: 'Container collected from shipper and gated in at Yangshan Deep-Water Port.',
      location: 'Shanghai, China',
      timestamp: iso(now, -17 * DAY),
      completed: true,
    },
    {
      title: 'Departed Origin Facility',
      description: 'Loaded on board vessel and departed port of loading.',
      location: 'Shanghai, China',
      timestamp: iso(now, -16 * DAY),
      completed: true,
    },
    {
      title: 'Arrived at Transit Hub',
      description: 'Vessel called at transshipment hub. Container remained on board.',
      location: 'Singapore, Singapore',
      timestamp: iso(now, -11 * DAY),
      completed: true,
    },
    {
      title: 'In Transit',
      description: 'Vessel berthed at Jebel Ali for scheduled port call. Cargo secure.',
      location: 'Dubai, UAE',
      timestamp: iso(now, -2 * 60_000),
      completed: true,
    },
    {
      title: 'Arrived at Transit Hub',
      description: 'Scheduled transit through the Suez Canal.',
      location: 'Port Said, Egypt',
      timestamp: iso(now, 8 * DAY),
      completed: false,
    },
    {
      title: 'Out for Delivery',
      description: 'Discharge, customs release and final-mile delivery.',
      location: 'Rotterdam, Netherlands',
      timestamp: iso(now, 15 * DAY),
      completed: false,
    },
    {
      title: 'Delivered',
      description: 'Proof of delivery recorded at consignee premises.',
      location: 'Rotterdam, Netherlands',
      timestamp: iso(now, 16 * DAY),
      completed: false,
    },
  ]

  const frankfurt = place('Frankfurt', 'Germany', 8.57, 50.03)
  const london = place('London', 'United Kingdom', -0.45, 51.47)
  const newYork = place('New York', 'United States', -73.78, 40.64)

  const losAngeles = place('Los Angeles', 'United States', -118.41, 33.94)
  const anchorage = place('Anchorage', 'United States', -149.99, 61.17)
  const tokyo = place('Tokyo', 'Japan', 140.39, 35.77)

  const rotterdamRoad = place('Rotterdam', 'Netherlands', 4.48, 51.92)
  const cologne = place('Cologne', 'Germany', 6.96, 50.94)
  const munich = place('Munich', 'Germany', 11.58, 48.14)
  const milan = place('Milan', 'Italy', 9.19, 45.46)

  const santos = place('Santos', 'Brazil', -46.3, -23.98)
  const capeTown = place('Cape Town', 'South Africa', 18.42, -33.9)
  const durban = place('Durban', 'South Africa', 31.05, -29.87)

  return [
    {
      trackingNumber: 'LGX-204981',
      status: 'In Transit',
      mode: 'ocean',
      service: 'Ocean Freight · FCL',
      origin: shanghai,
      destination: douala,
      currentLocation: singapore,
      estimatedDelivery: iso(now, 8 * DAY),
      lastUpdated: iso(now, -2 * HOUR),
      progress: 68,
      route: [
        { ...shanghai, status: 'completed', timestamp: iso(now, -6 * DAY) },
        { ...place('South China Sea', '', 112.5, 10.5), status: 'completed', timestamp: iso(now, -4 * DAY), waypoint: true },
        { ...singapore, status: 'current', timestamp: iso(now, -2 * HOUR) },
        { ...place('Indian Ocean', '', 60.0, -12.0), status: 'upcoming', timestamp: iso(now, 2 * DAY), waypoint: true },
        { ...place('Cape of Good Hope', '', 18.5, -35.0), status: 'upcoming', timestamp: iso(now, 5 * DAY), waypoint: true },
        { ...place('Gulf of Guinea', '', 3.0, -2.0), status: 'upcoming', timestamp: iso(now, 7 * DAY), waypoint: true },
        { ...douala, status: 'upcoming', timestamp: iso(now, 8 * DAY) },
      ],
      events: [
        { title: 'Shipment Picked Up', description: 'Cargo collected and gated in at the Waigaoqiao terminal.', location: 'Shanghai, China', timestamp: iso(now, -7 * DAY), completed: true },
        { title: 'Departed Origin Facility', description: 'Vessel departed the port of loading.', location: 'Shanghai, China', timestamp: iso(now, -6 * DAY), completed: true },
        { title: 'Arrived at Transit Hub', description: 'Transshipment and routine inspection underway.', location: 'Singapore, Singapore', timestamp: iso(now, -2 * HOUR), completed: true },
        { title: 'In Transit', description: 'Onward vessel to the destination port.', location: 'Singapore, Singapore', timestamp: iso(now, 1 * DAY), completed: false },
        { title: 'Delivered', description: 'Estimated delivery at Douala port.', location: 'Douala, Cameroon', timestamp: iso(now, 8 * DAY), completed: false },
      ],
    },
    {
      trackingNumber: 'PRL-7425487-570',
      status: 'In Transit',
      mode: 'ocean',
      service: 'Ocean Freight · FCL 40ft HC',
      origin: shanghai,
      destination: rotterdam,
      currentLocation: dubai,
      estimatedDelivery: iso(now, 16 * DAY),
      lastUpdated: iso(now, -2 * 60_000),
      progress: 48,
      route: oceanRoute,
      events: oceanEvents,
    },
    {
      trackingNumber: 'PRL-3318902-114',
      status: 'Out for Delivery',
      mode: 'air',
      service: 'Air Freight · Express',
      origin: frankfurt,
      destination: newYork,
      currentLocation: newYork,
      estimatedDelivery: iso(now, 5 * HOUR),
      lastUpdated: iso(now, -18 * 60_000),
      progress: 90,
      route: [
        { ...frankfurt, status: 'completed', timestamp: iso(now, -2 * DAY) },
        { ...london, status: 'completed', timestamp: iso(now, -1.6 * DAY) },
        { ...newYork, status: 'current', timestamp: iso(now, -18 * 60_000) },
      ],
      events: [
        { title: 'Shipment Picked Up', description: 'Collected from shipper and received at origin warehouse.', location: 'Frankfurt, Germany', timestamp: iso(now, -2.4 * DAY), completed: true },
        { title: 'Departed Origin Facility', description: 'Screened and departed on scheduled flight.', location: 'Frankfurt, Germany', timestamp: iso(now, -2 * DAY), completed: true },
        { title: 'Arrived at Transit Hub', description: 'Transferred to connecting transatlantic flight.', location: 'London, United Kingdom', timestamp: iso(now, -1.6 * DAY), completed: true },
        { title: 'In Transit', description: 'Arrived at JFK and cleared by customs.', location: 'New York, United States', timestamp: iso(now, -1 * DAY), completed: true },
        { title: 'Out for Delivery', description: 'Loaded onto delivery vehicle for final-mile delivery.', location: 'New York, United States', timestamp: iso(now, -18 * 60_000), completed: true },
        { title: 'Delivered', description: 'Awaiting proof of delivery.', location: 'New York, United States', timestamp: iso(now, 5 * HOUR), completed: false },
      ],
    },
    {
      trackingNumber: 'PRL-5590231-208',
      status: 'Delivered',
      mode: 'air',
      service: 'Air Freight · Standard',
      origin: losAngeles,
      destination: tokyo,
      currentLocation: tokyo,
      estimatedDelivery: iso(now, -1 * DAY),
      lastUpdated: iso(now, -1 * DAY),
      progress: 100,
      route: [
        { ...losAngeles, status: 'completed', timestamp: iso(now, -4 * DAY) },
        { ...anchorage, status: 'completed', timestamp: iso(now, -3.5 * DAY) },
        { ...tokyo, status: 'current', timestamp: iso(now, -1 * DAY) },
      ],
      events: [
        { title: 'Shipment Picked Up', description: 'Collected from shipper.', location: 'Los Angeles, United States', timestamp: iso(now, -4.5 * DAY), completed: true },
        { title: 'Departed Origin Facility', description: 'Departed LAX on freighter service.', location: 'Los Angeles, United States', timestamp: iso(now, -4 * DAY), completed: true },
        { title: 'Arrived at Transit Hub', description: 'Technical stop and transfer at Anchorage.', location: 'Anchorage, United States', timestamp: iso(now, -3.5 * DAY), completed: true },
        { title: 'In Transit', description: 'Arrived at Narita and released by customs.', location: 'Tokyo, Japan', timestamp: iso(now, -2.5 * DAY), completed: true },
        { title: 'Out for Delivery', description: 'Dispatched for final-mile delivery.', location: 'Tokyo, Japan', timestamp: iso(now, -1.2 * DAY), completed: true },
        { title: 'Delivered', description: 'Delivered and signed for by consignee.', location: 'Tokyo, Japan', timestamp: iso(now, -1 * DAY), completed: true },
      ],
    },
    {
      trackingNumber: 'PRL-8806417-093',
      status: 'In Transit',
      mode: 'road',
      service: 'Heavy Machinery · Lowboy Transport',
      origin: rotterdamRoad,
      destination: milan,
      currentLocation: munich,
      estimatedDelivery: iso(now, 1.5 * DAY),
      lastUpdated: iso(now, -42 * 60_000),
      progress: 64,
      route: [
        { ...rotterdamRoad, status: 'completed', timestamp: iso(now, -2 * DAY) },
        { ...cologne, status: 'completed', timestamp: iso(now, -1.5 * DAY) },
        { ...munich, status: 'current', timestamp: iso(now, -42 * 60_000) },
        { ...place('Innsbruck', 'Austria', 11.4, 47.27), status: 'upcoming', timestamp: iso(now, 0.5 * DAY), waypoint: true },
        { ...milan, status: 'upcoming', timestamp: iso(now, 1.5 * DAY) },
      ],
      events: [
        { title: 'Shipment Picked Up', description: 'Excavator loaded and secured on lowboy trailer.', location: 'Rotterdam, Netherlands', timestamp: iso(now, -2 * DAY), completed: true },
        { title: 'Departed Origin Facility', description: 'Departed with escort under oversize permit.', location: 'Rotterdam, Netherlands', timestamp: iso(now, -1.9 * DAY), completed: true },
        { title: 'In Transit', description: 'Scheduled rest stop and permit checkpoint.', location: 'Munich, Germany', timestamp: iso(now, -42 * 60_000), completed: true },
        { title: 'Out for Delivery', description: 'Alpine crossing and arrival at project site.', location: 'Milan, Italy', timestamp: iso(now, 1.3 * DAY), completed: false },
        { title: 'Delivered', description: 'Unloading supervised on site.', location: 'Milan, Italy', timestamp: iso(now, 1.5 * DAY), completed: false },
      ],
    },
    {
      trackingNumber: 'PRL-1204556-781',
      status: 'Arrived at Transit Hub',
      mode: 'ocean',
      service: 'Ocean Freight · LCL',
      origin: santos,
      destination: durban,
      currentLocation: capeTown,
      estimatedDelivery: iso(now, 4 * DAY),
      lastUpdated: iso(now, -3 * HOUR),
      progress: 72,
      route: [
        { ...santos, status: 'completed', timestamp: iso(now, -14 * DAY) },
        { ...capeTown, status: 'current', timestamp: iso(now, -3 * HOUR) },
        { ...place('Agulhas Bank', '', 21.0, -35.4), status: 'upcoming', timestamp: iso(now, 1 * DAY), waypoint: true },
        { ...place('Gqeberha', 'South Africa', 26.0, -34.3), status: 'upcoming', timestamp: iso(now, 2 * DAY), waypoint: true },
        { ...durban, status: 'upcoming', timestamp: iso(now, 3.5 * DAY) },
      ],
      events: [
        { title: 'Shipment Picked Up', description: 'Cargo received at origin CFS for consolidation.', location: 'Santos, Brazil', timestamp: iso(now, -16 * DAY), completed: true },
        { title: 'Departed Origin Facility', description: 'Vessel departed port of loading.', location: 'Santos, Brazil', timestamp: iso(now, -14 * DAY), completed: true },
        { title: 'Arrived at Transit Hub', description: 'Vessel arrived at transshipment port.', location: 'Cape Town, South Africa', timestamp: iso(now, -3 * HOUR), completed: true },
        { title: 'In Transit', description: 'Coastal feeder service to destination port.', location: 'Cape Town, South Africa', timestamp: iso(now, 1 * DAY), completed: false },
        { title: 'Out for Delivery', description: 'Deconsolidation and final-mile delivery.', location: 'Durban, South Africa', timestamp: iso(now, 3.8 * DAY), completed: false },
        { title: 'Delivered', description: 'Proof of delivery will be recorded.', location: 'Durban, South Africa', timestamp: iso(now, 4 * DAY), completed: false },
      ],
    },
  ]
}
