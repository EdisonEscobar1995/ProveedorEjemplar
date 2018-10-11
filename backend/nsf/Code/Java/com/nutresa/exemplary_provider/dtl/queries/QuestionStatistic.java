package com.nutresa.exemplary_provider.dtl.queries;

import java.util.List;

import com.google.gson.annotations.Expose;

public class QuestionStatistic {
	@Expose
    private String id;
    @Expose
    private String dimension;
    @Expose
    private String criterion;
    @Expose
    private String wording;
    @Expose
    private double answersCount;
    @Expose
    private double suppliersCount;
    @Expose
    private List<OptionStatistic> options;
    
    public class OptionStatistic {
    	@Expose
        private String id;
        @Expose
        private String name;
        @Expose
        private double count;
        @Expose
        private double percent;
        
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public double getCount() {
			return count;
		}
		public void setCount(double count) {
			this.count = count;
		}
		public double getPercent() {
			return percent;
		}
		public void setPercent(double percent) {
			this.percent = percent;
		}
    }
    
	public String getDimension() {
		return dimension;
	}

	public void setDimension(String dimension) {
		this.dimension = dimension;
	}

	public String getCriterion() {
		return criterion;
	}

	public void setCriterion(String criterion) {
		this.criterion = criterion;
	}

	public double getAnswersCount() {
		return answersCount;
	}

	public void setAnswersCount(double answersCount) {
		this.answersCount = answersCount;
	}

	public double getSuppliersCount() {
		return suppliersCount;
	}

	public void setSuppliersCount(double suppliersCount) {
		this.suppliersCount = suppliersCount;
	}

	public List<OptionStatistic> getOptions() {
		return options;
	}

	public void setOptions(List<OptionStatistic> options) {
		this.options = options;
	}

	public void setWording(String wording) {
		this.wording = wording;
	}

	public String getWording() {
		return wording;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}
}
