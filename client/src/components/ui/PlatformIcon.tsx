import React from 'react';
import { 
  SiGoogle, 
  SiFacebook, 
  SiInstagram, 
  SiLinkedin, 
  SiTiktok, 
  SiYoutube, 
  SiX,
  SiYelp,
  SiSnapchat,
  SiPinterest,
  SiStripe,
  SiCalendly
} from 'react-icons/si';
import { Building2 } from 'lucide-react';

interface PlatformIconProps {
  platform: string;
  className?: string;
  size?: number;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ 
  platform, 
  className = "w-5 h-5", 
  size 
}) => {
  const iconProps = {
    className: size ? `w-${size} h-${size}` : className,
    'aria-label': `${platform} logo`
  };

  // Normalize platform name for consistent matching
  const normalizedPlatform = platform.toLowerCase().replace(/\s+/g, '');

  switch (normalizedPlatform) {
    case 'google':
    case 'googlebusiness':
    case 'gmb':
      return <SiGoogle {...iconProps} style={{ color: '#4285F4' }} />;
    
    case 'facebook':
    case 'meta':
      return <SiFacebook {...iconProps} style={{ color: '#1877F2' }} />;
    
    case 'instagram':
    case 'ig':
      return <SiInstagram {...iconProps} style={{ color: '#E4405F' }} />;
    
    case 'linkedin':
      return <SiLinkedin {...iconProps} style={{ color: '#0A66C2' }} />;
    
    case 'tiktok':
      return <SiTiktok {...iconProps} style={{ color: '#000000' }} />;
    
    case 'youtube':
    case 'yt':
      return <SiYoutube {...iconProps} style={{ color: '#FF0000' }} />;
    
    case 'x':
    case 'twitter':
      return <SiX {...iconProps} style={{ color: '#000000' }} />;
    
    case 'yelp':
      return <SiYelp {...iconProps} style={{ color: '#D32323' }} />;
    
    case 'snapchat':
    case 'snap':
      return <SiSnapchat {...iconProps} style={{ color: '#FFFC00' }} />;
    
    case 'pinterest':
      return <SiPinterest {...iconProps} style={{ color: '#BD081C' }} />;
    
    case 'stripe':
      return <SiStripe {...iconProps} style={{ color: '#6772E5' }} />;
    
    case 'calendly':
      return <SiCalendly {...iconProps} style={{ color: '#006BFF' }} />;
    
    default:
      // Generic building icon for unknown platforms
      return <Building2 {...iconProps} className={`${className} text-gray-500`} />;
  }
};

// Helper function to get platform brand colors
export const getPlatformColor = (platform: string): string => {
  const normalizedPlatform = platform.toLowerCase().replace(/\s+/g, '');
  
  const colors: Record<string, string> = {
    google: '#4285F4',
    googlebusiness: '#4285F4',
    gmb: '#4285F4',
    facebook: '#1877F2',
    meta: '#1877F2',
    instagram: '#E4405F',
    ig: '#E4405F',
    linkedin: '#0A66C2',
    tiktok: '#000000',
    youtube: '#FF0000',
    yt: '#FF0000',
    x: '#000000',
    twitter: '#000000',
    yelp: '#D32323',
    snapchat: '#FFFC00',
    snap: '#FFFC00',
    pinterest: '#BD081C',
    stripe: '#6772E5',
    calendly: '#006BFF'
  };

  return colors[normalizedPlatform] || '#6B7280';
};

export default PlatformIcon;