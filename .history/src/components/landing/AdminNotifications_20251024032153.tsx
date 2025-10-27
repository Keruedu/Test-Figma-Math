import { useState } from 'react'

interface Notification {
  id: number
  title: string
  content: string
  type: 'system' | 'event' | 'support' | 'reward' | 'competition'
  audience: string
  status: 'sent' | 'scheduled' | 'draft'
  date: string
  recipients: number
}

const notificationHistory: Notification[] = [
  {
    id: 1,
    title: 'Cập nhật hệ thống v2.0',
    content: 'Hệ thống đã được cập nhật với nhiều tính năng mới',
    type: 'system',
    audience: 'Tất cả người dùng',
    status: 'sent',
    date: '2025-10-18',
    recipients: 1250
  },
  {
    id: 2,
    title: 'Cuộc thi Toán học tháng 10',
    content: 'Đăng ký ngay để tham gia cuộc thi và nhận giải thưởng',
    type: 'competition',
    audience: 'Học sinh lớp 6-9',
    status: 'scheduled',
    date: '2025-10-20',
    recipients: 450
  },
  {
    id: 3,
    title: 'Điểm thưởng x2 cuối tuần',
    content: 'Nhận gấp đôi điểm thưởng khi hoàn thành bài tập',
    type: 'reward',
    audience: 'Tất cả người dùng',
    status: 'sent',
    date: '2025-10-17',
    recipients: 1250
  },
  {
    id: 4,
    title: 'Bảo trì server định kỳ',
    content: 'Hệ thống sẽ tạm ngưng từ 2h-4h sáng ngày 19/10',
    type: 'system',
    audience: 'Tất cả người dùng',
    status: 'scheduled',
    date: '2025-10-19',
    recipients: 1250
  }
]

export const AdminNotifications = () => {
  const [selectedType, setSelectedType] = useState('system')
  const [selectedAudience, setSelectedAudience] = useState('all')

  const notificationTypes = [
    { value: 'system', label: 'Hệ thống', icon: '', color: 'blue' },
    { value: 'event', label: 'Sự kiện', icon: '', color: 'purple' },
    { value: 'support', label: 'Hỗ trợ', icon: '', color: 'green' },
    { value: 'reward', label: 'Phần thưởng', icon: '', color: 'orange' },
    { value: 'competition', label: 'Cuộc thi', icon: '', color: 'yellow' }
  ]

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      system: 'bg-blue-50 text-blue-700 border-blue-200',
      event: 'bg-purple-50 text-purple-700 border-purple-200',
      support: 'bg-green-50 text-green-700 border-green-200',
      reward: 'bg-orange-50 text-orange-700 border-orange-200',
      competition: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    }
    return colors[type] || colors.system
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      sent: 'bg-green-50 text-green-700 border-green-200',
      scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
      draft: 'bg-gray-50 text-gray-700 border-gray-200'
    }
    return colors[status] || colors.draft
  }

  return (
    <div className="animate-fade-slide animate-delay-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Quản lý Thông báo
          </h2>
          <p className="text-gray-600">
            Tạo và gửi thông báo đến người dùng
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column: Message Composer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Composer Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Soạn thông báo mới
              </h3>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tiêu đề thông báo
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nội dung thông báo
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập nội dung chi tiết..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent resize-none"
                  />
                </div>

                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loại thông báo
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {notificationTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setSelectedType(type.value)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                          selectedType === type.value
                            ? 'bg-[#6E55FB] text-white border-[#6E55FB]'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#6E55FB]'
                        }`}
                      >
                        <span className="mr-1">{type.icon}</span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đối tượng nhận
                  </label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                  >
                    <option value="all">Tất cả người dùng</option>
                    <option value="students">Học sinh</option>
                    <option value="teachers">Giáo viên</option>
                    <option value="grade6-9">Lớp 6-9</option>
                    <option value="grade10-12">Lớp 10-12</option>
                    <option value="premium">Người dùng Premium</option>
                  </select>
                </div>

                {/* Date Scheduling */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lên lịch gửi (tùy chọn)
                    </label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="datetime-local"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày hết hạn (tùy chọn)
                    </label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6E55FB] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-[#6E55FB] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5d47d4] transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Gửi ngay
                  </button>
                  <button className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-xl font-bold border-2 border-gray-300 hover:border-[#6E55FB] transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Lên lịch
                  </button>
                  <button className="px-6 py-3 rounded-xl font-bold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    Lưu nháp
                  </button>
                </div>
              </div>
            </div>

            {/* Notification History */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lịch sử thông báo
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Tiêu đề
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Loại
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Ngày gửi
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Người nhận
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {notificationHistory.map((notification) => (
                      <tr key={notification.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{notification.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{notification.content}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(notification.type)}`}>
                            {notificationTypes.find(t => t.value === notification.type)?.icon}
                            <span className="ml-1">{notificationTypes.find(t => t.value === notification.type)?.label}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {new Date(notification.date).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(notification.status)}`}>
                            {notification.status === 'sent' && 'Đã gửi'}
                            {notification.status === 'scheduled' && 'Đã lên lịch'}
                            {notification.status === 'draft' && 'Nháp'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{notification.recipients.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{notification.audience}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Xem chi tiết">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Chỉnh sửa">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#6E55FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Xem trước
                </h3>

                {/* Preview Container */}
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Đây là cách thông báo sẽ hiển thị cho người dùng:
                  </p>

                  {/* Mobile Preview */}
                  <div className="border-2 border-gray-300 rounded-2xl p-4 bg-gray-50">
                    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#6E55FB] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900 text-sm">
                              Tiêu đề thông báo
                            </h4>
                            <span className="text-xs text-gray-500">Vừa xong</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed text-left">
                            Nội dung thông báo sẽ hiển thị ở đây. Người dùng có thể đọc toàn bộ thông tin chi tiết.
                          </p>
                          {/* <div className="mt-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${getTypeColor(selectedType)}`}>
                              {notificationTypes.find(t => t.value === selectedType)?.icon}
                              <span className="ml-1">{notificationTypes.find(t => t.value === selectedType)?.label}</span>
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <h5 className="font-semibold text-gray-900 text-sm mb-3">Thống kê gửi</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Đối tượng:</span>
                        <span className="font-semibold text-gray-900">
                          {selectedAudience === 'all' ? 'Tất cả (1,250)' : 'Nhóm cụ thể'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loại:</span>
                        <span className="font-semibold text-gray-900">
                          {notificationTypes.find(t => t.value === selectedType)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thời gian gửi:</span>
                        <span className="font-semibold text-gray-900">Ngay lập tức</span>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <h5 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Mẹo hay
                    </h5>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Tiêu đề nên ngắn gọn, dưới 50 ký tự</li>
                      <li>• Nội dung rõ ràng, dễ hiểu</li>
                      <li>• Chọn loại phù hợp với nội dung</li>
                      <li>• Kiểm tra kỹ trước khi gửi</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
