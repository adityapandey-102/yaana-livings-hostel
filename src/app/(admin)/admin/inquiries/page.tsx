// app/(admin)/admin/inquiries/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { RENTAL_PROPERTIES } from '@/data/properties'
import { logError } from '@/lib/logging'

// Single source of truth: derive admin-friendly options from RENTAL_PROPERTIES.
const properties = RENTAL_PROPERTIES.map((p) => ({ id: String(p.id), name: p.name }))

function getPropertyName(id: string | null): string {
  if (!id) return 'N/A'
  const property = properties.find((p) => p.id === id)
  return property?.name || 'Unknown Property'
}

type InquiryStatus = 'NEW' | 'CONTACTED' | 'CLOSED'

type Inquiry = {
  id: string
  name: string
  phone: string
  email: string | null
  message: string | null
  propertyId: string | null
  source: string
  status: InquiryStatus
  createdAt: string
  updatedAt: string
}

type ConfirmModalProps = {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  confirmColor?: string
}

function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  confirmColor = 'bg-lavender-600 hover:bg-lavender-700',
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-yaana-charcoal mb-2">{title}</h3>
          <p className="text-yaana-charcoal-light mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-lavender-200 rounded-md text-sm font-medium text-yaana-charcoal bg-white hover:bg-yaana-lavender-base"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-md text-sm font-medium ${confirmColor}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

type ViewModalProps = {
  isOpen: boolean
  inquiry: Inquiry | null
  onClose: () => void
  onUpdateStatus: (status: InquiryStatus) => void
  onDelete: () => void
}

function ViewModal({ isOpen, inquiry, onClose, onUpdateStatus, onDelete }: ViewModalProps) {
  if (!isOpen || !inquiry) return null

  const getStatusColor = (status: InquiryStatus) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800'
      case 'CONTACTED':
        return 'bg-green-100 text-green-800'
      case 'CLOSED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yaana-lavender-base text-yaana-charcoal'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-yaana-charcoal">Inquiry Details</h2>
            <button
              onClick={onClose}
              className="text-lavender-700 hover:text-yaana-charcoal-light text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-yaana-charcoal-light mb-1">Name</label>
                <p className="text-yaana-charcoal font-medium">{inquiry.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-yaana-charcoal-light mb-1">Phone</label>
                <p className="text-yaana-charcoal">{inquiry.phone}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-yaana-charcoal-light mb-1">Email</label>
                <p className="text-yaana-charcoal break-all leading-relaxed pr-2">{inquiry.email || '-'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-yaana-charcoal-light mb-1">Property</label>
                <p className="text-yaana-charcoal">{getPropertyName(inquiry.propertyId)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-yaana-charcoal-light mb-1">Source</label>
                <p className="text-yaana-charcoal">{inquiry.source}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-yaana-charcoal-light mb-1">Status</label>
                <select
                  value={inquiry.status}
                  onChange={(e) => onUpdateStatus(e.target.value as InquiryStatus)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border-0 cursor-pointer ${getStatusColor(inquiry.status)}`}
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-yaana-charcoal-light mb-1">Created At</label>
                <p className="text-yaana-charcoal text-sm">
                  {new Date(inquiry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-yaana-charcoal-light mb-1">Message</label>
              <p className="text-yaana-charcoal whitespace-pre-wrap bg-yaana-lavender-base p-3 rounded-md">
                {inquiry.message || 'No message provided'}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-lavender-600 text-white rounded-md text-sm font-medium hover:bg-lavender-700"
            >
              Delete Inquiry
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-yaana-soft-lavender text-yaana-charcoal rounded-md text-sm font-medium hover:bg-yaana-soft-lavender"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    propertyId: '',
    source: 'website',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
    confirmText?: string
    confirmColor?: string
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  })

  const fetchInquiries = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      })
      
      if (statusFilter !== 'ALL') {
        params.append('status', statusFilter)
      }

      const res = await fetch(`/api/inquiries?${params.toString()}`)
      const data = await res.json()
      setInquiries(Array.isArray(data.data) ? data.data : [])
      setTotalPages(data.totalPages || 1)
      setTotalCount(data.totalCount || 0)
    } catch (error) {
      logError('Failed to fetch inquiries:', error)
      setInquiries([])
    } finally {
      setLoading(false)
    }
  }, [currentPage, statusFilter])

  useEffect(() => {
    fetchInquiries()
  }, [fetchInquiries])

  function handleStatusFilterChange(newStatus: string) {
    setStatusFilter(newStatus)
    setCurrentPage(1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormErrors({})
    setSubmitting(true)

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.details) {
          const errors: Record<string, string> = {}
          data.details.forEach((err: any) => {
            errors[err.path[0]] = err.message
          })
          setFormErrors(errors)
        } else {
          alert(data.error || 'Failed to create inquiry')
        }
        return
      }

      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        propertyId: '',
        source: 'website',
      })
      setShowForm(false)
      fetchInquiries()
    } catch (error) {
      logError('Failed to create inquiry:', error)
      alert('Failed to create inquiry')
    } finally {
      setSubmitting(false)
    }
  }

  async function updateStatus(id: string, newStatus: InquiryStatus) {
    setConfirmModal({
      isOpen: true,
      title: 'Change Status',
      message: `Are you sure you want to change the status to ${newStatus}?`,
      confirmText: 'Change Status',
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false })
        
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        )
        
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus })
        }

        try {
          await fetch('/api/inquiries', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus }),
          })
        } catch (error) {
          logError('Failed to update status:', error)
          alert('Failed to update status')
          fetchInquiries()
        }
      },
    })
  }

  async function deleteInquiry(id: string) {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Inquiry',
      message: 'Are you sure you want to delete this inquiry? This action cannot be undone.',
      confirmText: 'Delete',
      confirmColor: 'bg-lavender-600 hover:bg-lavender-700',
      onConfirm: async () => {
        setConfirmModal({ ...confirmModal, isOpen: false })
        setShowViewModal(false)
        
        setInquiries((prev) => prev.filter((inq) => inq.id !== id))
        setTotalCount((prev) => prev - 1)

        try {
          await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' })
        } catch (error) {
          logError('Failed to delete inquiry:', error)
          alert('Failed to delete inquiry')
          fetchInquiries()
        }
      },
    })
  }

  function openViewModal(inquiry: Inquiry) {
    setSelectedInquiry(inquiry)
    setShowViewModal(true)
  }

  function closeViewModal() {
    setShowViewModal(false)
    setSelectedInquiry(null)
  }

  const getStatusColor = (status: InquiryStatus) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800'
      case 'CONTACTED':
        return 'bg-green-100 text-green-800'
      case 'CLOSED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yaana-lavender-base text-yaana-charcoal'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-yaana-lavender-base">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/admin/dashboard" className="text-lavender-700 hover:text-lavender-900">
                  ← Dashboard
                </Link>
                <h1 className="text-xl font-bold">Inquiries</h1>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex justify-center items-center h-64">
          <div className="text-yaana-charcoal-light">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yaana-lavender-base">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-lavender-700 hover:text-lavender-900">
                ← Dashboard
              </Link>
              <h1 className="text-xl font-bold">Inquiries</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-yaana-charcoal-light">Total: {totalCount}</span>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-lavender-600 text-white px-4 py-2 rounded hover:bg-lavender-700"
              >
                {showForm ? 'Cancel' : 'New Inquiry'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-yaana-charcoal">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="px-4 py-2 border border-lavender-200 rounded-md focus:outline-none focus:ring-lavender-600 focus:border-yaana-dark-lavender"
            >
              <option value="ALL">All</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-yaana-charcoal mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-lavender-200 rounded-md focus:outline-none focus:ring-lavender-600 focus:border-yaana-dark-lavender"
                  />
                  {formErrors.name && (
                    <p className="text-lavender-700 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-yaana-charcoal mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-lavender-200 rounded-md focus:outline-none focus:ring-lavender-600 focus:border-yaana-dark-lavender"
                  />
                  {formErrors.phone && (
                    <p className="text-lavender-700 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-yaana-charcoal mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-lavender-200 rounded-md focus:outline-none focus:ring-lavender-600 focus:border-yaana-dark-lavender"
                  />
                  {formErrors.email && (
                    <p className="text-lavender-700 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-yaana-charcoal mb-1">
                    Property
                  </label>
                  <select
                    value={formData.propertyId}
                    onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                    className="w-full px-3 py-2 border border-lavender-200 rounded-md focus:outline-none focus:ring-lavender-600 focus:border-yaana-dark-lavender"
                  >
                    <option value="">Select Property</option>
                    {properties.map((prop) => (
                      <option key={prop.id} value={prop.id}>
                        {prop.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-yaana-charcoal mb-1">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-lavender-200 rounded-md focus:outline-none focus:ring-lavender-600 focus:border-yaana-dark-lavender"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-lavender-600 text-white px-6 py-2 rounded hover:bg-lavender-700 disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Inquiry'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-yaana-soft-lavender text-yaana-charcoal px-6 py-2 rounded hover:bg-yaana-soft-lavender"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {!Array.isArray(inquiries) || inquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-yaana-charcoal-light">No inquiries found</p>
          </div>
        ) : (
          <>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-yaana-soft-lavender">
                  <thead className="bg-yaana-lavender-base">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-yaana-charcoal-light uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-yaana-soft-lavender">
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-yaana-lavender-base">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-yaana-charcoal">{inquiry.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-yaana-charcoal">{inquiry.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-yaana-charcoal">
                            {getPropertyName(inquiry.propertyId)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-yaana-charcoal">{inquiry.source}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(inquiry.status)}`}
                          >
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openViewModal(inquiry)}
                            className="text-lavender-700 hover:text-lavender-900"
                          >
                            View More
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-yaana-charcoal">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-lavender-200 rounded-md text-sm font-medium text-yaana-charcoal bg-white hover:bg-yaana-lavender-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-lavender-200 rounded-md text-sm font-medium text-yaana-charcoal bg-white hover:bg-yaana-lavender-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ViewModal
        isOpen={showViewModal}
        inquiry={selectedInquiry}
        onClose={closeViewModal}
        onUpdateStatus={(status) => selectedInquiry && updateStatus(selectedInquiry.id, status)}
        onDelete={() => selectedInquiry && deleteInquiry(selectedInquiry.id)}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        confirmText={confirmModal.confirmText}
        confirmColor={confirmModal.confirmColor}
      />
    </div>
  )
}
