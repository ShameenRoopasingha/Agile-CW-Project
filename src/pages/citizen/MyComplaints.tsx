import { useState, useEffect, useCallback, useRef } from "react";
import { Typography, Card, CardBody, Button, IconButton } from "../../lib/mt-components";
import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  XMarkIcon,
  PhotoIcon
} from "@heroicons/react/24/outline";
import { getComplaintHistory, addComplaint } from "../../lib/api";

const STATUS_STYLES: Record<string, { bg: string; text: string; icon: any }> = {
  pending: {
    bg: "bg-[#ffecd2]",
    text: "text-orange-700",
    icon: ClockIcon,
  },
  "in-progress": {
    bg: "bg-[#dce8ff]",
    text: "text-blue-700",
    icon: ExclamationTriangleIcon,
  },
  resolved: {
    bg: "bg-[#c5eacc]",
    text: "text-[#3d6e32]",
    icon: CheckCircleIcon,
  },
  rejected: {
    bg: "bg-[#ffd9d9]",
    text: "text-red-700",
    icon: XMarkIcon,
  },
};

export function MyComplaints() {
  const [filter, setFilter] = useState<"All" | "pending" | "in-progress" | "resolved" | "rejected">("All");
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Missed Collection");
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getComplaintHistory();
      if (res && res.history) {
        setComplaints(res.history);
      }
    } catch (err) {
      console.error("Failed to fetch complaint history", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const filtered = filter === "All" ? complaints : complaints.filter((c) => c.status === filter);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length > 5) {
        alert("You can only upload up to 5 images.");
        return;
      }
      setImages([...images, ...selectedFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in the title and description.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      images.forEach((file) => {
        formData.append("images", file);
      });

      await addComplaint(formData);
      alert("Complaint submitted successfully!");
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setType("Missed Collection");
      setImages([]);
      fetchComplaints();
    } catch (err: any) {
      alert("Failed to submit complaint: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 relative">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Typography variant="h4" color="blue-gray" className="font-bold text-xl">
            My Complaints
          </Typography>
          <Typography variant="small" color="gray" className="text-sm">
            {complaints.length} total complaints
          </Typography>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-3 px-5 rounded-xl text-sm border-none"
        >
          <PlusIcon className="h-4 w-4" strokeWidth={2.5} />
          New Complaint
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["All", "pending", "in-progress", "resolved", "rejected"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
              filter === tab
                ? "bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] text-gray-900"
                : "bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Complaint Cards */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-12">
            <Typography color="gray" className="text-sm font-bold">Loading complaints...</Typography>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <Typography color="gray" className="text-sm">
              No complaints found.
            </Typography>
          </div>
        ) : (
          filtered.map((complaint) => {
            const statusKey = complaint.status?.toLowerCase() || "pending";
            const style = STATUS_STYLES[statusKey] || STATUS_STYLES.pending;
            const Icon = style.icon;
            const d = new Date(complaint.createdAt);

            return (
              <Card
                key={complaint._id}
                className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none hover:shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] transition-shadow duration-300"
              >
                <CardBody className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <Typography variant="small" color="gray" className="font-mono text-xs text-gray-400">
                          {complaint._id}
                        </Typography>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
                          <Icon className="h-3.5 w-3.5" />
                          {complaint.status}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#f0f2f5] text-gray-600">
                          {complaint.type}
                        </span>
                      </div>
                      <Typography variant="h6" color="blue-gray" className="font-bold text-base mb-1">
                        {complaint.title}
                      </Typography>
                      <Typography variant="small" color="gray" className="text-sm mb-3">
                        {complaint.description}
                      </Typography>

                      {/* Attached Images preview */}
                      {complaint.imageUrls && complaint.imageUrls.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto py-2">
                          {complaint.imageUrls.map((url: string, i: number) => (
                            <img key={i} src={url} alt="Attachment" className="h-16 w-16 object-cover rounded-lg border border-gray-300 shadow-sm" />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end shrink-0 sm:mt-1">
                      <Typography variant="small" color="gray" className="text-xs whitespace-nowrap">
                        {d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </Typography>
                      <Typography variant="small" color="gray" className="text-xs text-gray-400 whitespace-nowrap">
                        {d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })
        )}
      </div>

      {/* Add Complaint Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-[#e6e9ef] rounded-[2rem] shadow-[24px_24px_48px_#c4c7cc,-24px_-24px_48px_#ffffff] border border-white/40 p-8 flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h5" color="blue-gray" className="font-bold">
                Submit a Complaint
              </Typography>
              <IconButton variant="text" onClick={() => !isSubmitting && setIsModalOpen(false)} className="rounded-full">
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </IconButton>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Title</label>
                <div className="bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-11 flex items-center">
                  <input required type="text" placeholder="e.g. Garbage not collected" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-none outline-none w-full text-sm font-bold text-gray-800" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Category / Type</label>
                <div className="bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-11 flex items-center relative">
                  <select value={type} onChange={(e) => setType(e.target.value)} className="w-full h-full bg-transparent border-none outline-none text-sm font-bold text-gray-800 appearance-none">
                    <option value="Missed Collection">Missed Collection</option>
                    <option value="Public Bin Issue">Public Bin Issue</option>
                    <option value="Illegal Dumping">Illegal Dumping</option>
                    <option value="Service Request">Service Request</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Description</label>
                <div className="bg-[#f0f2f5] rounded-xl px-4 py-3 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] flex">
                  <textarea required rows={3} placeholder="Describe the issue in detail..." value={description} onChange={(e) => setDescription(e.target.value)} className="bg-transparent border-none outline-none w-full text-sm font-bold text-gray-800 resize-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">
                  Attach Photos (Up to 5)
                </label>
                <div className="flex gap-2 flex-wrap items-center">
                  {images.map((file, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200 border border-gray-300">
                      <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 shadow-sm text-red-500 hover:text-red-700 transition-colors">
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-16 h-16 rounded-xl flex items-center justify-center bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] text-gray-500 hover:text-[#2c5126] transition-colors"
                    >
                      <PhotoIcon className="w-6 h-6" />
                    </button>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-gray-700 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#b2efcd] text-[#2c5126] rounded-xl font-bold text-sm shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#9de4be,inset_-2px_-2px_4px_#c5fadb] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
