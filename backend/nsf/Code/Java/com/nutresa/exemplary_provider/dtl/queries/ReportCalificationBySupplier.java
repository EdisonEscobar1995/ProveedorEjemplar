package com.nutresa.exemplary_provider.dtl.queries;

import java.util.List;

import com.google.gson.annotations.Expose;

public class ReportCalificationBySupplier {
    @Expose
    private String idSupplier;
    @Expose
    private String idSupplierByCall;
    @Expose
    private String sapCode;
    @Expose
    private String nit;
    @Expose
    private String name;
    @Expose
    private String supply;
    @Expose
    private String category;
    @Expose
    private String companySize;
    @Expose
    private List<TotalScoreEvaluatorDimension> totalScoreEvaluatorDimension;
    @Expose
    private List<TotalScoreEvaluatorCriterion> totalScoreEvaluatorCriterion;
    @Expose
    private String idState;
    @Expose
    private String whoEvaluateOfTechnicalTeam;
    @Expose
    private double totalScoreOfEvaluator;
    
    public double getTotalScoreOfEvaluator() {
		return totalScoreOfEvaluator;
	}

	public void setTotalScoreOfEvaluator(double totalScoreOfEvaluator) {
		this.totalScoreOfEvaluator = totalScoreOfEvaluator;
	}

	public String getWhoEvaluateOfTechnicalTeam() {
		return whoEvaluateOfTechnicalTeam;
	}

	public void setWhoEvaluateOfTechnicalTeam(String whoEvaluateOfTechnicalTeam) {
		this.whoEvaluateOfTechnicalTeam = whoEvaluateOfTechnicalTeam;
	}

	public String getSapCode() {
        return sapCode;
    }

    public void setSapCode(String sapCode) {
        this.sapCode = sapCode;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TotalScoreEvaluatorDimension> getTotalScoreEvaluatorDimension() {
		return totalScoreEvaluatorDimension;
	}

	public void setTotalScoreEvaluatorDimension(List<TotalScoreEvaluatorDimension> totalScoreEvaluatorDimension) {
		this.totalScoreEvaluatorDimension = totalScoreEvaluatorDimension;
	}
    
    public List<TotalScoreEvaluatorCriterion> getTotalScoreEvaluatorCriterion() {
		return totalScoreEvaluatorCriterion;
	}

	public void setTotalScoreEvaluatorCriterion(
			List<TotalScoreEvaluatorCriterion> totalScoreEvaluatorCriterion) {
		this.totalScoreEvaluatorCriterion = totalScoreEvaluatorCriterion;
	}

	public void setSupply(String supply) {
        this.supply = supply;
    }

    public String getSupply() {
        return supply;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public void setCompanySize(String companySize) {
        this.companySize = companySize;
    }

    public String getCompanySize() {
        return companySize;
    }

    public void setIdSupplier(String idSupplier) {
        this.idSupplier = idSupplier;
    }

    public String getIdSupplier() {
        return idSupplier;
    }

    public void setIdSupplierByCall(String idSupplierByCall) {
        this.idSupplierByCall = idSupplierByCall;
    }

    public String getIdSupplierByCall() {
        return idSupplierByCall;
    }

    public void setIdState(String idState) {
        this.idState = idState;
    }

    public String getIdState() {
        return idState;
    }
    
    public class TotalScoreEvaluatorCriterion {
    	@Expose
        private String dimension;
        @Expose
        private String idDimension;
        @Expose
        private String idCriterio;
		@Expose
        private String criterio;
        @Expose
        private double scoreTotal;
        @Expose
        private List<String> commentsEvaluators;
        
		public List<String> getCommentsEvaluators() {
			return commentsEvaluators;
		}
		public void setCommentsEvaluators(List<String> commentsEvaluators) {
			this.commentsEvaluators = commentsEvaluators;
		}
		public String getDimension() {
			return dimension;
		}
		public void setDimension(String dimension) {
			this.dimension = dimension;
		}
		public String getIdDimension() {
			return idDimension;
		}
		public void setIdDimension(String idDimension) {
			this.idDimension = idDimension;
		}		
		public String getIdCriterio() {
			return idCriterio;
		}
		public void setIdCriterio(String idCriterio) {
			this.idCriterio = idCriterio;
		}
		public String getCriterio() {
			return criterio;
		}
		public void setCriterio(String criterio) {
			this.criterio = criterio;
		}		
		public double getScoreTotal() {
			return scoreTotal;
		}
		public void setScoreTotal(double scoreTotal) {
			this.scoreTotal = scoreTotal;
		}
    }
    
    public class TotalScoreEvaluatorDimension {
    	@Expose
        private String dimension;
        @Expose
        private String idDimension;
        @Expose
        private double scoreTotal;
        
		public String getDimension() {
			return dimension;
		}
		public void setDimension(String dimension) {
			this.dimension = dimension;
		}
		public String getIdDimension() {
			return idDimension;
		}
		public void setIdDimension(String idDimension) {
			this.idDimension = idDimension;
		}
		public double getScoreTotal() {
			return scoreTotal;
		}
		public void setScoreTotal(double scoreTotal) {
			this.scoreTotal = scoreTotal;
		}
    }
       

}
