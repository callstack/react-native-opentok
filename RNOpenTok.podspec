Pod::Spec.new do |s|
  s.name         = "RNOpenTok"
  s.version      = "0.0.1"
  s.summary      = "RNOpenTok"
  s.description  = <<-DESC
                  RNOpenTok
                   DESC
  s.homepage     = "lol"
  s.license      = "MIT"
  s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = {
    "Michal Chudziak" => "mike.chudziak@callstack.io",
    "Piotr Drapich" => "drapich.piotr@gmail.com"
  }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/callstack/react-native-opentok.git", :tag => "master" }
  s.source_files  = "ios/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "OpenTok"

end
