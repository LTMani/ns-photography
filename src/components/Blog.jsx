import React, { useState } from 'react';
import { useContent } from '../data/contentContext';
import ImageWithFallback from './ImageWithFallback';
import { Sparkles, Calendar, Clock, ArrowRight, X } from 'lucide-react';

export default function Blog() {
  const { blogData } = useContent();
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="stories" className="py-28 px-6 sm:px-12 lg:px-20 bg-[#08080a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="font-sans text-xs tracking-[0.3em] font-semibold text-[#d4af37] uppercase">
                JOURNAL & INSIGHTS
              </span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {blogData.heading || "STORIES FRAME BY FRAME"}
            </h2>
          </div>
          <p className="text-sm text-[#8e8ea2] max-w-md font-sans leading-relaxed">
            {blogData.subheading ||
              "Insights into visual storytelling, sacred wedding rituals, equipment, and the art behind the lens."}
          </p>
        </div>

        {/* 5 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.posts?.map((post, idx) => (
            <article
              key={post.id || idx}
              onClick={() => setSelectedArticle(post)}
              data-cursor="view"
              className={`group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 bg-[#0f1015] flex flex-col justify-between cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.1)] ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Post Cover Image */}
                <div className={`relative w-full overflow-hidden ${idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    aspectRatio="aspect-full"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1015] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/70 border border-[#d4af37]/30 text-[#d4af37] backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#8a8a9e]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{post.date}</span>
                    </div>
                    {post.readTime && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white group-hover:text-gold-gradient transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9090a4] font-sans line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Bottom "Read More" button */}
              <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-bold tracking-widest uppercase text-[#d4af37] group-hover:text-white transition-colors">
                <span>READ COMPLETE STORY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl transition-all">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0f1016] border border-[#d4af37]/30 shadow-2xl p-6 sm:p-10 text-white">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-black transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 mb-4 inline-block">
              {selectedArticle.category}
            </span>

            <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-4">
              {selectedArticle.title}
            </h3>

            <div className="flex items-center gap-4 text-xs font-mono text-[#888899] mb-6 pb-6 border-b border-white/10">
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 aspect-video">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#c0c0d4] font-sans font-light leading-relaxed whitespace-pre-line">
              {selectedArticle.content || selectedArticle.summary}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
