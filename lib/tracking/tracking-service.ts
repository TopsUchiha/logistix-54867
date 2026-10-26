import { buildMockShipments } from './mock-data'
import { siteConfig } from '../site-config'
import type { Shipment, TrackingResult } from './types'

/**
 * Data-access contract for shipment tracking.
 * Swap `mockTrackingService` for an API-backed implementation later
 * (e.g. `fetch('/api/track/' + number)`) without changing any UI component.
 */
export interface TrackingService {
  getShipment(trackingNumber: string): Promise<TrackingResult>
  listDemoShipments(): Promise<Shipment[]>
}

const TRACKING_PATTERN = /^[A-Z]{2,4}-\d{6,7}(-\d{3})?$/

export function normalizeTrackingNumber(input: string) {
  return input.trim().toUpperCase().replace(/\s+/g, '')
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const mockTrackingService: TrackingService = {
  async getShipment(input) {
    const trackingNumber = normalizeTrackingNumber(input ?? '')
    await wait(650)

    if (!trackingNumber) {
      return { ok: false, reason: 'empty', message: 'Please enter a tracking number to search.' }
    }
    if (!TRACKING_PATTERN.test(trackingNumber)) {
      return {
        ok: false,
        reason: 'invalid-format',
        message: `That doesn’t look like a tracking number. They look like ${siteConfig.tracking.placeholder}.`,
      }
    }
    try {
      const shipment = buildMockShipments().find((s) => s.trackingNumber === trackingNumber)
      if (!shipment) {
        return {
          ok: false,
          reason: 'not-found',
          message: `We couldn't find a shipment with tracking number ${trackingNumber}. Please check the number and try again.`,
        }
      }
      return { ok: true, shipment }
    } catch {
      return {
        ok: false,
        reason: 'unavailable',
        message: 'Tracking is temporarily unavailable. Please try again in a few minutes.',
      }
    }
  },
  async listDemoShipments() {
    return buildMockShipments()
  },
}

export const trackingService: TrackingService = mockTrackingService

export const demoTrackingNumbers = buildMockShipments(0).map((s) => s.trackingNumber)
