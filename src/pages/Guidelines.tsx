import { DocumentTextIcon, PrinterIcon, ArrowDownTrayIcon, CheckBadgeIcon, ClockIcon, UsersIcon, ChevronUpIcon, ChevronDownIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

export function Guidelines() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full pt-8 pb-12 animate-in fade-in duration-500">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <DocumentTextIcon className="w-6 h-6 text-[#003829]" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Waste Segregation Guide</h1>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors border border-gray-200 sm:border-none rounded-lg py-2.5 sm:py-0">
            <PrinterIcon className="w-4 h-4" />
            Print
          </button>
          <a 
            href="/Waste_Segregation_Guide.pdf" 
            download="Waste_Segregation_Guide.pdf"
            className="flex-1 sm:flex-none flex justify-center items-center gap-2 text-sm font-semibold bg-[#6da580] hover:bg-[#5b8c6b] text-white px-5 py-2.5 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download PDF
          </a>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Side */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <div className="bg-[#003829] rounded-xl p-6 shadow-md text-white">
            <h2 className="text-lg font-bold mb-2">Civic Duty</h2>
            <p className="text-sm text-green-50 leading-relaxed opacity-90">
              Proper segregation reduces landfill usage by 60%. Join the movement.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-700 hover:text-[#003829] transition-colors block">Recycling Centers</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-[#003829] transition-colors block">Composting Guide</a></li>
              <li><a href="#" className="text-sm text-gray-700 hover:text-[#003829] transition-colors block">Collection Schedule</a></li>
            </ul>
          </div>
        </div>

        {/* Right Side PDF Viewer */}
        <div className="flex-1 w-full flex flex-col">
          <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col shadow-sm">
            
            {/* Toolbar */}
            <div className="h-auto min-h-[3rem] py-2 sm:py-0 sm:h-12 bg-[#e8f5e9] border-b border-[#c8e6c9] flex flex-wrap items-center justify-between px-4 gap-3 shrink-0">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs font-bold text-gray-700 whitespace-nowrap">Page 1 / 12</span>
                <div className="flex bg-[#e8f5e9] border border-[#c8e6c9] rounded overflow-hidden">
                  <button className="p-1 hover:bg-[#c8e6c9] text-gray-600 transition-colors"><ChevronUpIcon className="w-4 h-4" /></button>
                  <button className="p-1 hover:bg-[#c8e6c9] text-gray-600 transition-colors border-l border-[#c8e6c9]"><ChevronDownIcon className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity w-full sm:w-auto">
                <button className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"><MagnifyingGlassMinusIcon className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></button>
                <span className="text-[11px] sm:text-[10px] font-bold text-gray-700 w-10 sm:w-8 text-center">100%</span>
                <button className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"><MagnifyingGlassPlusIcon className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></button>
                <div className="w-px h-5 sm:h-4 bg-gray-300 mx-2"></div>
                <button className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"><ArrowsPointingOutIcon className="w-4 h-4 sm:w-3.5 sm:h-3.5" /></button>
              </div>
            </div>

            {/* Actual PDF Viewer */}
            <div className="bg-[#f8fafc] min-h-[400px] sm:min-h-[600px] flex justify-center border-t border-gray-200">
              <iframe 
                src="/Waste_Segregation_Guide.pdf#view=FitH" 
                className="w-full h-[400px] sm:h-[600px] border-none"
                title="Waste Segregation Guide"
              />
            </div>
          </div>

          {/* Badges */}
          <div className="w-full mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e8f5e9] text-[#1b8054] rounded-full text-xs font-semibold">
              <CheckBadgeIcon className="w-4 h-4" />
              Verified Content
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f1f5f9] text-gray-600 rounded-full text-xs font-medium">
              <ClockIcon className="w-4 h-4" />
              Last updated: 2 days ago
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f1f5f9] text-gray-600 rounded-full text-xs font-medium">
              <UsersIcon className="w-4 h-4" />
              14k Citizens downloaded
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Leaf SVG to match the EcoCycle brand feel
function LeafSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M17.026 2.455c-3.134.02-6.643 1.258-9.52 4.135C4.628 9.468 3.4 12.977 3.4 16.111v1.65l-2.072 2.072a1 1 0 0 0 1.414 1.414l2.072-2.072h1.65c3.134 0 6.643-1.228 9.52-4.105 2.877-2.877 4.115-6.386 4.115-9.52V3.9a1.5 1.5 0 0 0-1.5-1.5h-1.573zm-.5 2h1.073V5.55c0 2.7-.936 5.674-3.408 8.146-2.472 2.472-5.446 3.408-8.146 3.408H5.4V16.03c0-2.7.936-5.674 3.408-8.146 2.472-2.472 5.446-3.408 8.146-3.408h.572z"/>
      <path d="M14.61 7.975a1 1 0 0 0-1.414 0l-5.657 5.657a1 1 0 0 0 1.414 1.414l5.657-5.657a1 1 0 0 0 0-1.414z"/>
    </svg>
  );
}
