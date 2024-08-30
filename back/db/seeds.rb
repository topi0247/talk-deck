if Rails.env.development?
  10.times do |i|
    user = User.find_or_create_by(provider: 'google_oauth2', uid: i) do |u|
      u.name = "user#{i}"
      u.uuid = SecureRandom.uuid
    end

    random = Random.new
    random.rand(1..10).times do |j|
      situation = user.situations.build(title: "title#{j}")
      situation.set_uuid
      situation.save!
      random.rand(1..3).times do |k|
        target = Target.find_or_create_by(body: "target#{k}")
        situation.targets << target
      end
      random.rand(1..10).times do |l|
        situation.contents.create!(title: "title#{l}", comment: "comment#{l}")
      end
    end
  end
end
